import {AnyElementConfiguration, AnyElementInstance, ComponentOrHtmlElement} from '../types';
import {FormHooks, FormInstance, InstanceFormConfiguration} from './Form.types';
import {InteractiveElement, InteractiveElementConfiguration, InteractiveElementInstance} from './interactive-element';
import {PlainElement, PlainElementInstance} from './plain-element';
import {computed, ref} from 'vue';
import {createHookManager} from '@myparcel-vfb/hook-manager/src';
import {isOfType} from '@myparcel/ts-utils';
import {markComponentAsRaw} from '../utils';

export const FORM_HOOKS = ['beforeSubmit', 'afterSubmit', 'beforeValidate', 'afterValidate'] as const;

// noinspection JSUnusedGlobalSymbols
export class Form<FC extends InstanceFormConfiguration = InstanceFormConfiguration, FN extends string = string> {
  public readonly name: FN;

  public readonly config: Omit<FC, 'fields'>;
  public readonly hooks: FormInstance<FC>['hooks'];
  public readonly model = {} as FormInstance<FC>['model'];
  public readonly fields: FormInstance<FC>['fields'] = ref([]);
  public readonly fieldsWithNamesAndRefs: FormInstance<FC>['fieldsWithNamesAndRefs'];

  public isValid: FormInstance<FC>['isValid'] = ref(true);

  public constructor(name: FN, formConfig: FC & FormHooks) {
    const {fields, ...config} = formConfig;

    formConfig.hookNames = [...FORM_HOOKS, ...(formConfig.hookNames ?? [])];
    this.hooks = createHookManager(formConfig);

    this.name = name;
    this.config = config;

    fields.forEach((field) => {
      const instance = this.createFieldInstance(field, this);

      this.fields.value.push(instance);
    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    this.fieldsWithNamesAndRefs = computed(() => {
      return this.fields.value.filter((field) => {
        return isOfType<InteractiveElementInstance>(field, 'ref');
      });
    });
  }

  public addElement(element: AnyElementConfiguration, sibling?: string, position: 'before' | 'after' = 'after'): void {
    const newIndex = sibling
      ? this.fields.value.findIndex((field) => field.name === sibling)
      : this.fields.value.length;

    if (newIndex === -1) {
      // eslint-disable-next-line no-console
      console.error(`Field ${sibling} not found in form ${this.name}`);
      return;
    }

    const index = position === 'after' ? newIndex + 1 : newIndex;

    const newElement = this.createFieldInstance(element, this);

    this.fields.value.splice(index, 0, newElement);
  }

  public removeElement(name: string): void {
    const index = this.fields.value.findIndex((field) => field.name === name);
    this.fields.value.splice(index, 1);
  }

  public async submit(): Promise<void> {
    await this.hooks.execute('beforeSubmit', this);
    await this.validate();
    await this.hooks.execute('afterSubmit', this);
  }

  public async validate(): Promise<boolean> {
    await this.hooks.execute('beforeValidate', this);
    const result = await Promise.all(
      this.fields.value.map((field) => {
        if (!isOfType<InteractiveElementInstance>(field, 'ref')) {
          field.resetValidation();
          return true;
        }

        return field.validate();
      }),
    );

    this.isValid.value = result.every(Boolean);
    await this.hooks.execute('afterValidate', this);
    return this.isValid.value;
  }

  public async reset(): Promise<void> {
    await Promise.all(this.fieldsWithNamesAndRefs.value.map((field) => field.reset()));
  }

  public getValues(): Record<string, unknown> {
    return this.fieldsWithNamesAndRefs.value.reduce((acc, field) => {
      if (field.isDisabled) {
        return acc;
      }

      acc[field.name] = field.ref;
      return acc;
    }, {} as Record<string, unknown>);
  }

  private createFieldInstance(field: AnyElementConfiguration, form: FormInstance<FC>): AnyElementInstance {
    let instance: InteractiveElementInstance | PlainElementInstance;

    const elementConfig = {
      ...form.config.fieldDefaults,
      ...field,
      attributes: {
        ...form.config.fieldDefaults.attributes,
        ...field.attributes,
      },
    } as AnyElementConfiguration;

    if (isOfType<InteractiveElementConfiguration<ComponentOrHtmlElement, string>>(elementConfig, 'ref')) {
      instance = new InteractiveElement(form, elementConfig.name, elementConfig);
    } else {
      instance = new PlainElement(form, elementConfig);
    }

    markComponentAsRaw(instance.component);
    markComponentAsRaw(instance.wrapper);

    if (isOfType<AnyElementConfiguration<ComponentOrHtmlElement, string>>(elementConfig, 'name')) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      this.model[elementConfig.name] = instance;
    }

    return instance;
  }

  private createFormInstance(): FormInstance<FC> & {fields: undefined} {
    return {...this, fields: undefined};
  }
}
