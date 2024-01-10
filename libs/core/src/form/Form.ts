import {computed, ref, watch, reactive, unref} from 'vue';
import {get, isDefined} from '@vueuse/core';
import {createHookManager} from '@myparcel-vfb/hook-manager';
import {isOfType} from '@myparcel/ts-utils';
import {markComponentAsRaw} from '../utils';
import {type ToRecord} from '../types/common.types';
import {
  type AnyElementConfiguration,
  type AnyElementInstance,
  type ElementName,
  type InteractiveElementInstance,
  type InteractiveElementConfiguration,
  type FormInstance,
  type InstanceFormConfiguration,
  type FormHooks,
  type FormValues,
} from '../types';
import {FORM_HOOKS, FormHook} from '../data';
import {PlainElement} from './PlainElement';
import {InteractiveElement} from './InteractiveElement';

// noinspection JSUnusedGlobalSymbols
export class Form<V extends FormValues = FormValues> {
  public readonly config: FormInstance<V>['config'];
  public readonly fields: FormInstance<V>['fields'] = ref([]);
  public readonly hooks: FormInstance<V>['hooks'];
  public readonly interactiveFields: FormInstance<V>['interactiveFields'];
  public isDirty: FormInstance<V>['isDirty'];
  public isValid: FormInstance<V>['isValid'] = ref(true);
  public readonly model = {} as FormInstance<V>['model'];
  public readonly name: FormInstance<V>['name'];
  public readonly off: FormInstance<V>['off'];
  public readonly on: FormInstance<V>['on'];
  public readonly stable: FormInstance<V>['stable'] = ref(false);
  public readonly values: FormInstance<V>['values'];

  public constructor(name: FormInstance<V>['name'], formConfig: ToRecord<InstanceFormConfiguration<V> & FormHooks>) {
    const {fields, ...config} = formConfig;

    formConfig.hookNames = [...FORM_HOOKS, ...(formConfig.hookNames ?? [])];
    this.hooks = createHookManager(formConfig);

    this.on = this.hooks.register.bind(this.hooks);
    this.off = this.hooks.unregister.bind(this.hooks);

    this.name = name;
    this.config = config;
    this.values = reactive<V>({} as V);

    markComponentAsRaw(this.config.field.wrapper);
    markComponentAsRaw(this.config.fieldDefaults.wrapper);

    fields.forEach((field) => {
      const instance = this.createFieldInstance(field as AnyElementConfiguration, this as unknown as FormInstance<V>);

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

    const newElement = this.createFieldInstance(element, this as unknown as FormInstance<V>);

    get(this.fields).splice(index, 0, newElement);
    await this.hooks.execute(FormHook.AfterAddElement, this, element);

    return newElement;
  }

  public getField<F extends AnyElementInstance | null = AnyElementInstance | null>(name: string): F {
    return (this.model[name] ?? get(this.fields).find((field) => field.name === name) ?? null) as F;
  }

  public getValue<T = unknown>(fieldName: string): T {
    const fieldInstance = this.ensureGetField<InteractiveElementInstance>(fieldName);

    return get(fieldInstance.ref) as T;
  }

  public getValues(): V {
    return get(this.values) as V;
  }

  public removeElement(name: string): void {
    const index = get(this.fields).findIndex((field) => field.name === name);

    get(this.fields).splice(index, 1);
  }

  public async reset(): Promise<void> {
    await this.hooks.execute(FormHook.BeforeReset, this);
    await Promise.all(get(this.interactiveFields).map((field) => field.reset()));
    await this.hooks.execute(FormHook.AfterReset, this);
  }

  public setValue(fieldName: string, value: unknown): void {
    const fieldInstance = this.getField<InteractiveElementInstance>(fieldName);

    if (!fieldInstance) {
      return;
    }

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

  protected ensureGetField<I extends AnyElementInstance>(name: string): I {
    const field = this.getField<I>(name);

    if (!field) {
      throw new Error(`Field ${name} not found in form ${this.name}`);
    }

    return field;
  }

  private createFieldInstance(field: AnyElementConfiguration, form: FormInstance<V>): AnyElementInstance {
    const elementConfig = {
      ...form.config.fieldDefaults,
      ...field,
      attributes: {
        ...form.config.fieldDefaults?.attributes,
        ...field.attributes,
      },
    };

    markComponentAsRaw(elementConfig.component);
    markComponentAsRaw(elementConfig.wrapper);

    if (!isOfType<InteractiveElementConfiguration>(elementConfig, 'ref')) {
      const instance = new PlainElement(form as FormInstance, elementConfig);

      return this.registerElement(elementConfig.name, instance);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const instance: InteractiveElementInstance<any> = new InteractiveElement<
      FormInstance,
      string,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      InteractiveElementConfiguration<any>
    >(form, elementConfig);

    watch(instance.ref, async (value: unknown) => {
      await this.hooks.execute(FormHook.ElementChange, this, instance, value);

      if (!get(instance.isDisabled)) {
        // @ts-expect-error todo
        this.values[elementConfig.name] = value as V[keyof V];
      }
    });

    if (!get(instance.isDisabled)) {
      // @ts-expect-error todo
      this.values[elementConfig.name] = unref(instance.ref) as V[keyof V];
    }

    return this.registerElement(elementConfig.name, instance);
  }

  private registerElement<I extends AnyElementInstance>(name: ElementName, instance: I): I {
    if (!isDefined(name)) {
      return instance;
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    this.model[name] = instance;

    return instance;
  }
}
