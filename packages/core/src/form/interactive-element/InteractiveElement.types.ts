import {BaseElementConfiguration, ComponentOrHtmlElement, FieldName} from '../../types';
import {ComputedRef, Ref} from 'vue';
import {FieldValidator, ValidateFunction, Validator} from './validator';
import {FormConfiguration, FormInstance} from '../Form.types';
import {MaybeRefOrComputed, PromiseOr} from '@myparcel/vue-form-builder-utils';
import {PlainElementInstance} from '../plain-element';

export type InteractiveElementConfiguration<
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  N extends FieldName = FieldName,
  RT = unknown,
> = BaseElementConfiguration<C> &
  FieldValidator<RT, C, N> & {
    name: N;
    ref: Ref<RT>;
    label?: string;

    lazy?: boolean;

    disabled?: MaybeRefOrComputed<boolean>;
    visible?: MaybeRefOrComputed<boolean>;
    optional?: MaybeRefOrComputed<boolean>;

    sanitize?: (_: InteractiveElementInstance, value: RT) => RT;
  };

export const INTERACTIVE_ELEMENT_HOOKS: ReadonlyArray<keyof InteractiveElementHooks> = [
  'beforeBlur',
  'afterBlur',

  'beforeFocus',
  'focus',
  'afterFocus',

  'beforeSanitize',
  'sanitize',
  'afterSanitize',

  'beforeUpdate',
  'afterUpdate',

  'beforeValidate',
  'validate',
  'afterValidate',
] as const;

export type InteractiveElementHooks<I = InteractiveElementInstance, RT = unknown> = {
  beforeBlur: (field: I, value: RT) => PromiseOr<void>;
  afterBlur: (field: I, value: RT) => PromiseOr<void>;

  beforeFocus: (field: I, event: FocusEvent) => PromiseOr<void>;
  focus: (field: I, event: FocusEvent) => PromiseOr<void>;
  afterFocus: (field: I, event: FocusEvent) => PromiseOr<void>;

  beforeSanitize: (field: I, value: RT) => PromiseOr<void>;
  sanitize: (field: I, value: RT) => PromiseOr<RT>;
  afterSanitize: (field: I, value: RT) => PromiseOr<void>;

  beforeUpdate: (field: I, value: RT, oldValue: RT) => PromiseOr<void>;
  afterUpdate: (field: I, value: RT, oldValueT: RT) => PromiseOr<void>;

  beforeValidate: (field: I, value: RT) => PromiseOr<void>;
  validate: ValidateFunction;
  afterValidate: (field: I, value: RT, isValid: boolean) => PromiseOr<void>;
};

export type InteractiveElementInstance<
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  N extends FieldName = FieldName,
  RT = unknown,
> = PlainElementInstance<C, N> & {
  form: FormInstance<FormConfiguration, C, N, RT>;
  ref: Ref<RT>;

  label?: string;

  lazy: boolean;

  isDirty: Ref<false>;
  isDisabled: Ref<false>;
  isOptional: Ref<false>;
  isSuspended: Ref<false>;
  isTouched: Ref<false>;
  isVisible: Ref<true>;

  /**
   * Determines whether the field is valid.
   */
  isValid: ComputedRef<PromiseOr<boolean>>;

  /**
   * Validators used to compute the value of isValid.
   */
  validators: Validator<RT, C, N>[];

  /**
   * Error messages generated during validation.
   */
  errors: Ref<string[]>;

  /**
   * Resets the field.
   */
  reset: () => PromiseOr<void>;
};
