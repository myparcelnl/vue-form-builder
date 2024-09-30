import {type ComponentSlots} from 'vue-component-type-helpers';
import {type Ref, type ComputedRef, type Component, type Slots} from 'vue';
import {type UnwrapNestedRefs} from '@vue/reactivity';
import {type FunctionOr, type AnyAttributes} from '@myparcel-vfb/utils';
import {type HookManagerInstance} from '@myparcel-vfb/hook-manager';
import {type PromiseOr, type ReadonlyOr} from '@myparcel/ts-utils';
import {type Validator, type ValidateFunction} from './validator.types';
import {type FormInstance} from './form.types';
import {type ComponentProps, type ComponentOrHtmlElement} from './component.types';
import {type ToRecord} from './common.types';

export type FieldName = string;

export type FieldSlots = Slots;

export interface CreatedField<Type = unknown, Props extends ComponentProps = ComponentProps> {
  Component: Component<Props>;
  field: FieldConfiguration<Type, Props>;
  ref: Ref<Type>;
}

export interface ModularCreatedField<Type = unknown, Props extends ComponentProps = ComponentProps>
  extends CreatedField<Type, Props> {
  /**
   * Only available when `wrapper` is `false`.
   * @TODO: reflect this in the type
   */
  Errors: Component;

  /**
   * Only available when `wrapper` is `false`.
   * @TODO: reflect this in the type
   */
  Label: Component;
}

export interface FieldConfiguration<Type = unknown, Props extends ComponentProps = ComponentProps>
  extends FieldHooks<Type, Props> {
  name: FieldName;

  /**
   * Attributes to be passed to the component.
   */
  attributes?: AnyAttributes;

  /**
   * HTML element or Vue component. Can be any type of component that renders as a Vue fragment, including JSX
   * templates.
   */
  component: ComponentOrHtmlElement<Props>;

  /**
   * Name of the field to port errors to.
   */
  errorsTarget?: string;

  /**
   * Hooks to be registered.
   */
  hookNames?: ReadonlyOr<string[]>;

  /**
   * Element label.
   */
  label?: string;

  /**
   * Props to be passed to the component.
   */
  props?: Props;

  /**
   * Slot content to be passed to the component.
   */
  slots?: ComponentSlots<any>;

  /**
   * Selector to render the field in.
   * @deprecated
   */
  teleportSelector?: string;

  /**
   * Visibility of the element. Defaults to true.
   */
  visible?: boolean;

  /**
   * Wrap the field in a TableFormGroup. Defaults to true.
   */
  wrapper?: boolean | Component;

  /**
   * Computed visibility of the element.
   */
  isVisible?: ComputedRef<boolean>;

  /**
   * The ref of the field. Will be created if not provided.
   */
  ref?: Ref<Type>;

  // TODO: figure out a way to have the validator properties exclude each other with the types still working properly

  // Computed validator
  isValid?: ComputedRef<boolean>;

  // Single validator
  validate?: ValidateFunction<Type, Props>;
  errorMessage?: FunctionOr<string>;
  precedence?: number;

  // Multiple validators
  validators?: Validator<Type, Props>[];

  /**
   * Whether the field is lazy. Defaults to false.
   */
  lazy?: boolean;

  /**
   * Whether the element is disabled. Defaults to false.
   */
  disabled?: boolean;

  /**
   * Whether the element is optional. Defaults to false.
   */
  optional?: boolean;

  /**
   * Whether the element is read-only. Defaults to false.z
   */
  readOnly?: boolean;

  /**
   * Computed read only state of the element.
   */
  isReadOnly?: ComputedRef<boolean>;

  /**
   * Computed disabled state of the element.
   */
  isDisabled?: ComputedRef<boolean>;

  /**
   * Computed optional state of the element.
   */
  isOptional?: ComputedRef<boolean>;

  visibleWhen?(instance: FieldInstance<Type, Props>): PromiseOr<boolean>;
  disabledWhen?(instance: FieldInstance<Type, Props>): PromiseOr<boolean>;
  optionalWhen?(instance: FieldInstance<Type, Props>): PromiseOr<boolean>;
  readOnlyWhen?(instance: FieldInstance<Type, Props>): PromiseOr<boolean>;
}

export interface FieldHooks<
  Type = unknown,
  Props extends ComponentProps = ComponentProps,
  I extends FieldInstance<Type, Props> = FieldInstance<Type, Props>,
> {
  beforeFocus?(instance: I, event: FocusEvent): PromiseOr<void>;
  focus?(instance: I, event: FocusEvent): PromiseOr<void>;
  afterFocus?(instance: I, event: FocusEvent): PromiseOr<void>;

  beforeClick?(instance: I): PromiseOr<void>;
  click?(instance: I, event: MouseEvent): PromiseOr<void>;
  afterClick?(instance: I): PromiseOr<void>;

  beforeBlur?(instance: I, value: Type): PromiseOr<void>;
  blur?(instance: I, event: MouseEvent): PromiseOr<void>;
  afterBlur?(instance: I, value: Type): PromiseOr<void>;

  beforeSanitize?(instance: I, value: Type): PromiseOr<void>;
  afterSanitize?(instance: I, value: Type): PromiseOr<void>;

  beforeUpdate?(instance: I, value: Type, oldValue: Type): PromiseOr<void>;
  afterUpdate?(instance: I, value: Type, oldValueT: Type): PromiseOr<void>;

  beforeValidate?(instance: I, value: Type): PromiseOr<void>;
  afterValidate?(instance: I, value: Type, isValid: boolean): PromiseOr<void>;
}

export interface FieldInstance<Type = unknown, Props extends ComponentProps = ComponentProps>
  extends FieldHooks<Type, Props> {
  ref: Ref<Type>;

  readonly name: FieldName;
  readonly form: FormInstance;
  readonly component: ComponentOrHtmlElement<Props>;

  readonly hooks: HookManagerInstance<ToRecord<FieldHooks<Type, Props>>>;

  readonly lazy: boolean;
  readonly wrapper: boolean | Component;

  readonly attributes: UnwrapNestedRefs<AnyAttributes>;
  readonly props: UnwrapNestedRefs<Props>;
  /** @deprecated use template slots */
  readonly slots?: FieldSlots;

  /** @deprecated */
  readonly teleportSelector?: string;

  readonly label?: string;
  readonly errorsTarget?: string;
  readonly errors: Ref<FunctionOr<string>[]>;
  readonly formattedErrors: ComputedRef<string[]>;

  readonly isVisible: Ref<boolean>;
  readonly isDirty: Ref<boolean>;
  readonly isDisabled: Ref<boolean>;
  readonly isOptional: Ref<boolean>;
  readonly isReadOnly: Ref<boolean>;
  readonly isSuspended: Ref<boolean>;
  readonly isTouched: Ref<boolean>;

  /**
   * Determines whether the field is valid.
   */
  readonly isValid: Ref<boolean>;

  /**
   * Validators used to compute the value of isValid.
   */
  readonly validators: Ref<Validator<Type, Props>[]>;

  /**
   * Resets the field.
   */
  reset(): PromiseOr<void>;
  /**
   * Destroys the field.
   */
  destroy(): Promise<void>;

  /**
   * Validates the field.
   */
  validate(): Promise<boolean>;

  resetValidation(): void;

  setValue(value: Type): void;

  setDisabled(disabled: boolean): void;

  setOptional(optional: boolean): void;

  setReadOnly(optional: boolean): void;

  addError(error: string): void;

  setVisible(value: boolean): void;
}

export type ElementProp<Type = unknown, Props = ComponentProps> = UnwrapNestedRefs<FieldInstance<Type, Props>>;

export interface FieldWrapperProps<Type = unknown, Props = ComponentProps> {
  element: ElementProp<Type, Props>;
}

export interface FieldProps<Type = unknown, Props = ComponentProps> extends FieldWrapperProps<Type, Props> {
  modelValue: Type;
}

export type FieldEmits<Type = unknown> = (event: 'update:modelValue', value: Type) => void;
