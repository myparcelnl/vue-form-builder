import {AnyElementConfiguration, AnyElementInstance, ComponentOrHtmlElement} from '../types';
import {FormHooks, FormInstance, InstanceFormConfiguration} from './Form.types';
import {InteractiveElement, InteractiveElementConfiguration, InteractiveElementInstance} from './interactive-element';
import {PlainElement, PlainElementInstance} from './plain-element';
import {computed, ref} from 'vue';
import {createHookManager} from '@myparcel-vfb/hook-manager/src';
import {get} from '@vueuse/core';
import {isOfType} from '@myparcel/ts-utils';
import {markComponentAsRaw} from '../utils';

export const FORM_HOOKS = ['beforeSubmit', 'afterSubmit', 'beforeValidate', 'afterValidate'] as const;

// noinspection JSUnusedGlobalSymbols
export class Form<FC extends InstanceFormConfiguration = InstanceFormConfiguration, FN extends string = string> {
  public readonly name: FN;

  public readonly stable: FormInstance<FC>['stable'] = ref(false);
  public readonly config: Omit<FC, 'fields'>;
  public readonly hooks: FormInstance<FC>['hooks'];
  public readonly model = {} as FormInstance<FC>['model'];
  public readonly fields: FormInstance<FC>['fields'] = ref([]);
  public readonly interactiveFields: FormInstance<FC>['interactiveFields'];

  public readonly on: FormInstance<FC>['on'];
  public readonly off: FormInstance<FC>['off'];

  // @ts-expect-error This is initialized this on render.
  public element: FormInstance<FC>['element'];

  public isValid: FormInstance<FC>['isValid'] = ref(true);

  public constructor(name: FN, formConfig: FC & FormHooks) {
    const {fields, ...config} = formConfig;

    formConfig.hookNames = [...FORM_HOOKS, ...(formConfig.hookNames ?? [])];
    this.hooks = createHookManager(formConfig);

    this.on = this.hooks.register.bind(this.hooks);
    this.off = this.hooks.unregister.bind(this.hooks);

    this.name = name;
    this.config = config;

    markComponentAsRaw(this.config.field.wrapper);
    markComponentAsRaw(this.config.fieldDefaults.wrapper);

    fields.forEach((field) => {
      const instance = this.createFieldInstance(field, this);

      get(this.fields).push(instance);
    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    this.interactiveFields = computed(() => {
      return get(this.fields).filter((field) => {
        return isOfType<InteractiveElementInstance>(field, 'ref');
      });
    });
    this.stable.value = true;
  }

  public addElement(element: AnyElementConfiguration, sibling?: string, position: 'before' | 'after' = 'after'): void {
    const newIndex = sibling ? get(this.fields).findIndex((field) => field.name === sibling) : get(this.fields).length;

    if (newIndex === -1) {
      // eslint-disable-next-line no-console
      console.error(`Field ${sibling} not found in form ${this.name}`);
      return;
    }

    const index = position === 'after' ? newIndex + 1 : newIndex;

    const newElement = this.createFieldInstance(element, this);

    get(this.fields).splice(index, 0, newElement);
  }

  public removeElement(name: string): void {
    const index = get(this.fields).findIndex((field) => field.name === name);

    get(this.fields).splice(index, 1);
  }

  public async submit(): Promise<void> {
    await this.hooks.execute('beforeSubmit', this);
    await this.validate();
    await this.hooks.execute('afterSubmit', this);
  }

  public async validate(): Promise<boolean> {
    await this.hooks.execute('beforeValidate', this);

    const result = await Promise.all(
      get(this.fields).map((field) => {
        if (!isOfType<InteractiveElementInstance>(field, 'ref')) {
          field.resetValidation();
          return true;
        }

        return field.validate();
      }),
    );

    this.isValid.value = result.every(Boolean);

    await this.hooks.execute('afterValidate', this);

    return get(this.isValid);
  }

  public async reset(): Promise<void> {
    await Promise.all(get(this.interactiveFields).map((field) => field.reset()));
  }

  public getValues(): Record<string, unknown> {
    return get(this.interactiveFields).reduce((acc, field) => {
      if (field.isDisabled) {
        return acc;
      }

      acc[field.name] = field.ref;
      return acc;
    }, {} as Record<string, unknown>);
  }

  public getValue(field: string): unknown {
    const fieldInstance = this.model[field];

    if (!fieldInstance) {
      // eslint-disable-next-line no-console
      console.error(`Field ${field} not found in form ${this.name}`);
      return;
    }

    return get(fieldInstance.ref);
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

    markComponentAsRaw(elementConfig.component);
    markComponentAsRaw(elementConfig.wrapper);

    if (isOfType<InteractiveElementConfiguration<ComponentOrHtmlElement, string>>(elementConfig, 'ref')) {
      instance = new InteractiveElement(form, elementConfig.name, elementConfig);
    } else {
      instance = new PlainElement(form, elementConfig);
    }

    if (isOfType<AnyElementConfiguration<ComponentOrHtmlElement, string>>(elementConfig, 'name')) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      this.model[elementConfig.name] = instance;
    }

    return instance;
  }
}
