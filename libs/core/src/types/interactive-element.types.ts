import {type Ref, type ComputedRef} from 'vue';
import {type FunctionOr} from '@myparcel-vfb/utils';
import {type HookManagerInstance} from '@myparcel-vfb/hook-manager';
import {type PromiseOr} from '@myparcel/ts-utils';
import {type Validator, type ValidateFunction} from './validator.types';
import {
  type BaseElementInstance,
  type ElementName,
  type BaseElementConfiguration,
  type BaseElementHooks,
} from './element.types';
import {type ComponentProps} from './component.types';
import {type ToRecord} from './common.types';

export interface InteractiveElementConfiguration<Type = unknown, Props extends ComponentProps = ComponentProps>
  extends BaseElementConfiguration<Props>,
    InteractiveElementHooks<Type, Props> {
  name: NonNullable<ElementName>;
  ref: Ref<Type>;

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
}

export interface InteractiveElementHooks<
  Type = unknown,
  Props extends ComponentProps = ComponentProps,
  I extends InteractiveElementInstance<Type, Props> = InteractiveElementInstance<Type, Props>,
> extends BaseElementHooks<I> {
  beforeBlur?(instance: I, value: Type): PromiseOr<void>;

  blur?(instance: I, event: MouseEvent): PromiseOr<void>;

  afterBlur?(instance: I, value: Type): PromiseOr<void>;

  beforeSanitize?(instance: I, value: Type): PromiseOr<void>;

  afterSanitize?(instance: I, value: Type): PromiseOr<void>;

  beforeUpdate?(instance: I, value: Type, oldValue: Type): PromiseOr<void>;

  afterUpdate?(instance: I, value: Type, oldValueT: Type): PromiseOr<void>;

  beforeValidate?(instance: I, value: Type): PromiseOr<void>;

  afterValidate?(instance: I, value: Type, isValid: boolean): PromiseOr<void>;

  disabledWhen?(instance: I): PromiseOr<boolean>;

  optionalWhen?(instance: I): PromiseOr<boolean>;

  readOnlyWhen?(instance: I): PromiseOr<boolean>;
}

export interface InteractiveElementInstance<Type = unknown, Props extends ComponentProps = ComponentProps>
  extends BaseElementInstance<Props>,
    InteractiveElementHooks<Type, Props> {
  readonly hooks: HookManagerInstance<ToRecord<InteractiveElementHooks<Type, Props>>>;

  readonly name: NonNullable<ElementName>;
  ref: Ref<Type>;

  readonly lazy: boolean;

  readonly isDirty: Ref<boolean>;
  readonly isSuspended: Ref<boolean>;
  readonly isTouched: Ref<boolean>;

  readonly isDisabled: Ref<boolean>;
  readonly isOptional: Ref<boolean>;
  readonly isReadOnly: Ref<boolean>;

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
   * Validates the field.
   */
  validate(): Promise<boolean>;

  setDisabled(disabled: boolean): void;

  setOptional(optional: boolean): void;

  setReadOnly(optional: boolean): void;
}
