import {computed, ref, watch, reactive, toValue, type Ref} from 'vue';
import {useMemoize} from '@vueuse/core';
import {createHookManager} from '@myparcel-vfb/hook-manager';
import {markComponentAsRaw} from '../utils';
import {
  type ToRecord,
  type FieldConfiguration,
  type FormInstance,
  type InstanceFormConfiguration,
  type FormValues,
  type FieldInstance,
  type ComponentProps,
} from '../types';
import {FormHook, FORM_HOOKS} from '../data';
import {Field} from './Field';

// noinspection JSUnusedGlobalSymbols
export class Form<Values extends FormValues = FormValues> {
  public readonly config: FormInstance<Values>['config'];
  public readonly fields: FormInstance<Values>['fields'] = ref([]);
  public readonly hooks: FormInstance<Values>['hooks'];
  public readonly isDirty: FormInstance<Values>['isDirty'];
  public readonly isValid: FormInstance<Values>['isValid'];
  public readonly model = {} as FormInstance<Values>['model'];
  public readonly name: FormInstance<Values>['name'];
  public readonly off: FormInstance<Values>['off'];
  public readonly on: FormInstance<Values>['on'];
  public readonly values: FormInstance<Values>['values'];

  protected readonly stopHandles: Ref<(() => void)[]> = ref([]);

  private getFieldMemoized = useMemoize((name: string): FieldInstance | null => {
    const found = toValue(this.fields).find((field) => field.name === name);

    return found ?? null;
  });

  public async destroy(): Promise<void> {
    this.stopHandles.value.forEach((handler) => handler());

    await Promise.all(this.fields.value.map((field) => field.destroy()));
  }

  public constructor(name: FormInstance<Values>['name'], formConfig: ToRecord<InstanceFormConfiguration<Values>>) {
    formConfig.hookNames = [...FORM_HOOKS, ...(formConfig.hookNames ?? [])];
    this.hooks = createHookManager(formConfig) as FormInstance<Values>['hooks'];

    this.on = this.hooks.register.bind(this.hooks);
    this.off = this.hooks.unregister.bind(this.hooks);

    this.name = name;
    this.config = formConfig;
    this.values = reactive<Values>({} as Values);

    markComponentAsRaw(this.config.field.wrapper);
    markComponentAsRaw(this.config.fieldDefaults.wrapper);

    this.isDirty = computed(() => toValue(this.fields).some((field) => toValue(field.isDirty)));
    this.isValid = computed(() => toValue(this.fields).every((field) => toValue(field.isValid)));
  }

  public async addElement<EC extends FieldConfiguration = FieldConfiguration, S extends string | undefined = undefined>(
    element: EC,
  ): Promise<S extends string ? undefined | FieldInstance : FieldInstance> {
    await this.hooks.execute(FormHook.BeforeAddElement, this, element);
    const newElement = this.addFieldInstance(element, this as unknown as FormInstance<Values>);
    await this.hooks.execute(FormHook.AfterAddElement, this, element);

    return newElement;
  }

  public getField<F extends FieldInstance | null = FieldInstance | null>(name: string): F {
    return this.getFieldMemoized(name) as F;
  }

  /** @deprecated use computed values */
  public getValue<T = unknown>(fieldName: string): T {
    const fieldInstance = this.ensureGetField<FieldInstance>(fieldName);

    return toValue(fieldInstance.ref) as T;
  }

  /** @deprecated use computed values */
  public getValues(): Values {
    return toValue(this.values) as Values;
  }

  public async reset(): Promise<void> {
    await this.hooks.execute(FormHook.BeforeReset, this);
    await Promise.all(toValue(this.fields).map((field) => field.reset()));
    await this.hooks.execute(FormHook.AfterReset, this);
  }

  public setValue(fieldName: string, value: unknown): void {
    const fieldInstance = this.getField<FieldInstance>(fieldName);

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

  public async validate(): Promise<void> {
    await this.hooks.execute(FormHook.BeforeValidate, this);
    await Promise.all(toValue(this.fields).map((field) => field.validate()));
    await this.hooks.execute(FormHook.AfterValidate, this);
  }

  public removeElement(name: string): void {
    const field = this.getField<FieldInstance>(name);

    if (!field) {
      return;
    }

    const index = toValue(this.fields).indexOf(field);

    if (index === -1) {
      return;
    }

    toValue(this.fields).splice(index, 1);
  }

  protected ensureGetField<I extends FieldInstance>(name: string): I {
    const field = this.getField<I>(name);

    if (!field) {
      throw new Error(`Field ${name} not found in form ${this.name}`);
    }

    return field;
  }

  private addFieldInstance<Type = unknown, Props extends ComponentProps = ComponentProps>(
    field: FieldConfiguration<Type, Props>,
    form: FormInstance<Values>,
  ): FieldInstance<Type, Props> {
    const elementConfig = {
      ...form.config.fieldDefaults,
      ...field,
      attributes: {
        ...form.config.fieldDefaults?.attributes,
        ...field.attributes,
      },
    } satisfies FieldConfiguration<Type, Props>;

    markComponentAsRaw(elementConfig.component);
    markComponentAsRaw(elementConfig.wrapper);

    const instance: FieldInstance<Type, Props> = new Field<Type, Props>(form, elementConfig);

    const stop = watch(instance.ref, async (value: Type) => {
      await this.hooks.execute(FormHook.ElementChange, this, instance, value);

      if (!toValue(instance.isDisabled)) {
        this.values[elementConfig.name] = value;
      }
    });

    this.stopHandles.value.push(stop);

    if (!toValue(instance.isDisabled)) {
      this.values[elementConfig.name] = toValue(instance.ref);
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    this.model[elementConfig.name] = instance;
    toValue(this.fields).push(instance);
    this.getFieldMemoized.delete(elementConfig.name);

    return instance;
  }
}
