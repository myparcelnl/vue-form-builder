import {computed, ref, watch} from 'vue';
import {get} from '@vueuse/core';
import {createHookManager} from '@myparcel-vfb/hook-manager/src';
import {isOfType} from '@myparcel/ts-utils';
import {markComponentAsRaw} from '../utils';
import {type AnyElementConfiguration, type AnyElementInstance, type ComponentOrHtmlElement} from '../types';
import {PlainElement, type PlainElementInstance} from './plain-element';
import {
  InteractiveElement,
  type InteractiveElementConfiguration,
  type InteractiveElementInstance,
} from './interactive-element';
import {FORM_HOOKS, FormHook} from './hooks';
import {type FormHooks, type FormInstance, type InstanceFormConfiguration} from './Form.types';

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
  public isDirty: FormInstance<FC>['isDirty'];

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
      const instance = this.createFieldInstance(field, this as unknown as FormInstance<FC>);

      get(this.fields).push(instance);
    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    this.interactiveFields = computed(() => {
      return get(this.fields).filter((field) => {
        return isOfType<InteractiveElementInstance>(field, 'ref');
      });
    });

    this.isDirty = computed(() => get(this.interactiveFields).some((field) => get(field.isDirty)));

    this.stable.value = true;
  }

  public async addElement(
    element: AnyElementConfiguration,
    sibling?: string,
    position: 'before' | 'after' = 'after',
  ): Promise<void> {
    await this.hooks.execute(FormHook.BeforeAddElement, this, element);
    const newIndex = sibling ? get(this.fields).findIndex((field) => field.name === sibling) : get(this.fields).length;

    if (newIndex === -1) {
      // eslint-disable-next-line no-console
      console.error(`Field ${sibling} not found in form ${this.name}`);
      return;
    }

    const index = position === 'after' ? newIndex + 1 : newIndex;

    const newElement = this.createFieldInstance(element, this as unknown as FormInstance<FC>);

    get(this.fields).splice(index, 0, newElement);
    await this.hooks.execute(FormHook.AfterAddElement, this, element);
  }

  public removeElement(name: string): void {
    const index = get(this.fields).findIndex((field) => field.name === name);

    get(this.fields).splice(index, 1);
  }

  public async submit(): Promise<void> {
    await this.hooks.execute(FormHook.BeforeSubmit, this);
    await this.validate();
    await this.hooks.execute(FormHook.AfterSubmit, this);
  }

  public async validate(): Promise<boolean> {
    await this.hooks.execute(FormHook.BeforeValidate, this);

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

    await this.hooks.execute(FormHook.AfterValidate, this);

    return get(this.isValid);
  }

  public async reset(): Promise<void> {
    await this.hooks.execute(FormHook.BeforeReset, this);
    await Promise.all(get(this.interactiveFields).map((field) => field.reset()));
    await this.hooks.execute(FormHook.AfterReset, this);
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

      watch(elementConfig.ref, async (value: unknown) => {
        await this.hooks.execute(FormHook.ElementChange, this, instance, value);
      });
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
