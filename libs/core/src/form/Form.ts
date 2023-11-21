import {computed, ref, watch} from 'vue';
import {get} from '@vueuse/core';
import {createHookManager} from '@myparcel-vfb/hook-manager';
import {isOfType} from '@myparcel/ts-utils';
import {markComponentAsRaw} from '../utils';
import {type AnyElementConfiguration, type AnyElementInstance, type ComponentOrHtmlElement} from '../types';
import {FORM_HOOKS, FormHook} from '../data';
import {PlainElement, type PlainElementInstance} from './plain-element';
import {
  InteractiveElement,
  type InteractiveElementConfiguration,
  type InteractiveElementInstance,
} from './interactive-element';
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

  public async addElement<
    EC extends AnyElementConfiguration = AnyElementConfiguration,
    S extends string | undefined = undefined,
  >(
    element: EC,
    sibling?: S,
    position: 'before' | 'after' = 'after',
  ): Promise<S extends string ? undefined | AnyElementInstance : AnyElementInstance> {
    await this.hooks.execute(FormHook.BeforeAddElement, this, element);
    const newIndex = sibling ? get(this.fields).findIndex((field) => field.name === sibling) : get(this.fields).length;

    if (sibling && newIndex === -1) {
      // eslint-disable-next-line no-console
      console.error(`Field ${sibling} not found in form ${this.name}`);
      return undefined as S extends string ? undefined : AnyElementInstance;
    }

    const index = position === 'after' ? newIndex + 1 : newIndex;

    const newElement = this.createFieldInstance(element, this as unknown as FormInstance<FC>);

    get(this.fields).splice(index, 0, newElement);
    await this.hooks.execute(FormHook.AfterAddElement, this, element);

    return newElement;
  }

  public getField<F extends AnyElementInstance | null = AnyElementInstance | null>(name: string): F {
    return (this.model[name] ?? get(this.fields).find((field) => field.name === name) ?? null) as F;
  }

  public getValue<T = unknown>(fieldName: string): T {
    const fieldInstance = this.ensureGetField(fieldName);

    return get(fieldInstance.ref);
  }

  public getValues<T extends Record<string, unknown> = Record<string, unknown>>(): T {
    return get(this.interactiveFields).reduce((acc, field) => {
      if (field.isDisabled) {
        return acc;
      }

      acc[field.name as keyof T] = field.ref as T[keyof T];
      return acc;
    }, {} as T);
  }

  public removeElement(name: string): void {
    const index = get(this.fields).findIndex((field) => field.name === name);

    get(this.fields).splice(index, 1);
  }

  public setValue(fieldName: string, value: unknown): void {
    const fieldInstance = this.ensureGetField(fieldName);

    fieldInstance.ref.value = value;
  }

  public setValues(values: Record<string, unknown>): void {
    Object.entries(values).forEach(([field, value]) => this.setValue(field, value));
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

  protected ensureGetField(name: string): AnyElementInstance {
    const field = this.getField(name);

    if (!field) {
      throw new Error(`Field ${name} not found in form ${this.name}`);
    }

    return field;
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
