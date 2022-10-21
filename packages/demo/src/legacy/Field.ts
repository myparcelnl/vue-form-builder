/* eslint-disable @typescript-eslint/ban-ts-comment */
import {Component, ComponentOptions, ComputedRef, Ref, computed, isRef, markRaw, reactive, ref, watch} from 'vue';
import {PromiseOr, RequireOnly} from '../../src/types';

export type FormHook<A> = undefined | ((ctx: A) => void) | ((ctx: A) => Promise<void>);

export type FieldHook<Ctx, A = never, R = void> =
  | undefined
  | ((ctx: Ctx, ...args: A[]) => R)
  | ((ctx: Ctx, ...args: A[]) => Promise<R>);

export type ConstructorFieldProperties<State extends StateProps, Type, Comp extends ComponentOptions> = RequireOnly<
  FieldProperties<State, Type, Comp>,
  'component'
>;

interface FieldConstructor<State extends StateProps, Type, C> {
  new (options: ConstructorFieldProperties<State, Type, C>): FieldProperties<State, Type, C>;
}

interface FieldProperties<State extends StateProps, Type, Comp extends ComponentOptions> {
  afterInput?: FieldHook<Form<State, Type, Comp>, Type>;
  beforeInput?: FieldHook<Form<State, Type, Comp>, Type>;
  checkVisible?: FieldHook<Form<State, Type, Comp>, never, PromiseOr<boolean>>;
  component: Component;
  blur: FieldHook<Form<State, Type, Comp>>;
  input?: FieldHook<Form<State, Type, Comp>, Type>;
  isDirty: boolean;
  isOptional: boolean;
  isSuspended: boolean;
  isValid: boolean;
  isVisible: ComputedRef<boolean>;
  label?: string;
  onBlur?: FieldHook<Form<State, Type, Comp>, Type>;
  props?: Comp['props'];
  ref: Ref<Type>;
  sanitizeValue?: FieldHook<Form<State, Type, Comp>, Type>;
  setValue: FieldHook<Form<State, Type, Comp>>;
  validate: FieldHook<Form<State, Type, Comp>>;
  validationWarnings: string[];
  validators?: {validator: FieldHook<Form<State, Type, Comp>, Type>; errorMessage: string}[];
}

export const createField = <State extends StateProps, Type, Comp>(
  form: Form<State, Type, Comp>,
  ctor: FieldConstructor<State, Type, Comp>,
  options: ConstructorFieldProperties<State, Type, Comp>,
) => {
  return new Field<State, Type, Comp>(form, options);
};

export class Field<Ctx extends StateProps = Record<string, unknown>, T = unknown, C = unknown>
  implements FieldProperties<Ctx, T, C>
{
  public onBlur;
  public component;
  public isDirty = false;
  public isOptional = false;
  public isSuspended = false;
  public isValid = true;

  public isVisible = computed(() => true);

  public label;
  public afterInput;
  public beforeInput;
  public props;
  public ref = ref();

  public checkVisible;

  // @ts-ignore
  public sanitizeValue = (value) => {
    return value;
  };

  // private readonly ctx: Form<Ctx, T, C>;
  public validationWarnings: string[] = [];
  public validators;

  public constructor(ctx: Form<Ctx, T, C>, config: ConstructorFieldProperties<Ctx, T, C>) {
    this.onBlur = config.onBlur;
    this.component = markRaw(config.component);

    // @ts-ignore
    this.input = config.input;
    this.isOptional = config.isOptional ?? false;

    this.isVisible = computed(async () => {
      return config.checkVisible?.(ctx) ?? true;
    });

    this.label = config.label;
    this.afterInput = config.afterInput;
    this.beforeInput = config.beforeInput;
    // @ts-ignore
    this.props = config.props ?? ({} as C['props']);

    if (config.ref) {
      if (!isRef(config.ref)) {
        throw new Error('config.ref must be a Ref!');
      }

      this.ref = config.ref;
    }

    // @ts-ignore
    this.sanitizeValue = config.sanitizeValue;
    this.validators = config.validators ?? [];

    watch(
      this.ref,
      () => {
        console.warn(this.ref, this.ref.value);
      },
      {immediate: true},
    );
  }

  public async blur() {
    console.log(this);
    console.log(this.ref);
    console.log(this.ref.value);
    if (this.isDirty) {
      return;
    }
    console.log(this.ref.value);

    this.isSuspended = true;
    console.log(this.ref.value);
    this.ref.value = await this.sanitizeValue?.(this.ref.value);
    console.log(this.ref.value);

    await this.validate();
    console.log(this.ref.value);

    if (!this.isValid) {
      this.isDirty = true;
      this.isSuspended = false;
      return;
    }

    await this.onBlur?.({}, this.ref.value);
    this.isDirty = true;
    this.isSuspended = false;
  }

  // @ts-ignore
  public async input(value) {
    this.isDirty = false;
    await this.beforeInput?.(value);
    this.ref.value = value;
    await this.afterInput?.(value);
  }

  // @ts-ignore
  public async setValue(value) {
    this.isDirty = false;
    this.ref.value = await this.sanitizeValue?.(value);
    await this.validate();
  }

  public async validate() {
    let valid = true;
    const validationWarnings: string[] = [];

    if (!this.isOptional && !this.ref.value) {
      valid = false;
      validationWarnings.push('Field is required');
    }

    await Promise.all(
      this.validators.map(async ({validator, errorMessage}) => {
        console.log(this.ref, this.ref.value);
        if (!(await validator?.(this.ctx, this.ref.value))) {
          valid = false;
          validationWarnings.push(errorMessage);
        }
      }),
    );

    this.isValid = valid;
    this.validationWarnings = validationWarnings;
  }
}

interface FormInterface<FK extends StateProps> {
  fields: Field<FK>[];
}

export type StateProps<K extends string = string> = Record<K, any>;

type DefineForm = <State extends StateProps>(
  state: State,
  fields: () => Record<keyof State, RequireOnly<Field<State>, 'component'>>,
) => Form<State>;

export const defineForm: DefineForm = (state, fields) => {
  return new Form(state, fields());
};

export class Form<State extends StateProps = Record<string, unknown>, T = unknown, C = unknown> {
  public fields: Record<keyof State, Field<State, T, C>>;
  public state: Record<keyof State, T>;

  public beforeSubmit: FormHook<Form<State, T, C>>;
  public afterSubmit: FormHook<Form<State, T, C>>;

  public submit = async () => {
    await this.beforeSubmit?.(this);
    console.log('submit');
    await this.afterSubmit?.(this);
  };

  constructor(
    state: Record<keyof State, T>,
    fields: Record<keyof State, RequireOnly<Field<State, State[keyof State]>, 'component'>>,
  ) {
    this.state = state;

    const newFields = {} as Record<keyof State, Field<State, T, C>>;

    Object.entries(fields).forEach(([key, field]) => {
      newFields[key as keyof State] = createField<State, T, C>(this, Field, field);
    });

    // @ts-ignore
    this.fields = reactive(newFields);
  }
}
