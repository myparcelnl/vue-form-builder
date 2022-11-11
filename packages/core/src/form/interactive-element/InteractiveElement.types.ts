import {BaseElementConfiguration, ComponentOrHtmlElement, ElementName} from '../../types';
import {FieldValidator, ValidateFunction, Validator} from './validator';
import {MaybeRefOrComputed} from '@myparcel-vfb/utils';
import {PLAIN_ELEMENT_HOOKS, PlainElementHooks, PlainElementInstance} from '../plain-element';
import {FormInstance} from '../Form.types';
import {HookManager} from '@myparcel-vfb/hook-manager';
import {PromiseOr} from '@myparcel/ts-utils';
import {Ref} from 'vue';

export type InteractiveElementConfiguration<
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  N extends ElementName = ElementName,
  RT = unknown,
> = BaseElementConfiguration<C> &
  FieldValidator<RT, C, N> & {
    name: N;
    ref: Ref<RT>;
    label?: string;

    lazy?: boolean;

    disabled?: boolean;
    visible?: boolean;
    optional?: boolean;

    sanitize?: (_: InteractiveElementInstance, value: RT) => RT;
  };

export const INTERACTIVE_ELEMENT_HOOKS = [
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
  ...PLAIN_ELEMENT_HOOKS,
] as const;

export type InteractiveElementHooks<
  I extends BaseInteractiveElementInstance = BaseInteractiveElementInstance,
  RT = unknown,
> = Omit<PlainElementHooks<I>, 'beforeBlur' | 'afterBlur'> & {
  beforeBlur?(instance: I, value: RT): PromiseOr<void>;
  afterBlur?(instance: I, value: RT): PromiseOr<void>;

  beforeSanitize?(field: I, value: RT): PromiseOr<void>;
  sanitize?(field: I, value: RT): PromiseOr<RT>;
  afterSanitize?(field: I, value: RT): PromiseOr<void>;

  beforeUpdate?(field: I, value: RT, oldValue: RT): PromiseOr<void>;
  afterUpdate?(field: I, value: RT, oldValueT: RT): PromiseOr<void>;

  beforeValidate?(field: I, value: RT): PromiseOr<void>;
  validate?: ValidateFunction;
  afterValidate?(field: I, value: RT, isValid: boolean): PromiseOr<void>;
};

export type BaseInteractiveElementInstance<
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  N extends ElementName = ElementName,
  RT = unknown,
> = PlainElementInstance<C, N> & {
  ref: Ref<RT>;

  form: FormInstance;
  hooks: HookManager<typeof INTERACTIVE_ELEMENT_HOOKS[number], InteractiveElementHooks>;

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
  isValid: Ref<boolean>;

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

export type InteractiveElementInstance<
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  N extends ElementName = ElementName,
  RT = unknown,
> = BaseInteractiveElementInstance<C, N, RT> & InteractiveElementHooks<BaseInteractiveElementInstance, RT>;
