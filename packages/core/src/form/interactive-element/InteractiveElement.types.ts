import {BaseElementConfiguration, ComponentHooks, ComponentOrHtmlElement, ElementName} from '../../types';
import {FieldValidator, Validator} from '../validator';
import {PLAIN_ELEMENT_HOOKS, PlainElementInstance} from '../plain-element';
import {FormInstance} from '../Form.types';
import {HookManagerInstance} from '@myparcel-vfb/hook-manager';
import {PromiseOr} from '@myparcel/ts-utils';
import {Ref} from 'vue';

export type InteractiveElementConfiguration<
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  N extends ElementName = ElementName,
  RT = unknown,
> = BaseElementConfiguration<C> &
  FieldValidator<C, N, RT> &
  InteractiveElementHooks<C, N, RT> & {
    name: N;
    ref: Ref<RT>;

    label?: string;
    lazy?: boolean;
  };

export const INTERACTIVE_ELEMENT_HOOKS = [
  'blur',
  'focus',
  'sanitize',
  'update',
  'validate',
  ...PLAIN_ELEMENT_HOOKS,
] as const;

export type InteractiveElementHooks<
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  N extends ElementName = ElementName,
  RT = unknown,
  I = BaseInteractiveElementInstance<C, N, RT>,
> = Partial<ComponentHooks<C, I>> & {
  beforeBlur?(instance: I, value: RT): PromiseOr<void>;
  blur?(instance: I, event: MouseEvent): PromiseOr<void>;
  afterBlur?(instance: I, value: RT): PromiseOr<void>;

  beforeFocus?(instance: I): PromiseOr<void>;
  focus?(instance: I, event: FocusEvent): PromiseOr<void>;
  afterFocus?(instance: I): PromiseOr<void>;

  beforeSanitize?(field: I, value: RT): PromiseOr<void>;
  sanitize?(field: I, value: RT): PromiseOr<RT>;
  afterSanitize?(field: I, value: RT): PromiseOr<void>;

  beforeUpdate?(field: I, value: RT, oldValue: RT): PromiseOr<void>;
  afterUpdate?(field: I, value: RT, oldValueT: RT): PromiseOr<void>;

  beforeValidate?(field: I, value: RT): PromiseOr<void>;
  validate?(field: I, value: RT): PromiseOr<boolean>;
  afterValidate?(field: I, value: RT, isValid: boolean): PromiseOr<void>;

  beforeClick?(instance: I): PromiseOr<void>;
  click?(instance: I, event: MouseEvent): PromiseOr<void>;
  afterClick?(instance: I): PromiseOr<void>;

  disabledCb?(field: I): PromiseOr<boolean>;
  optionalCb?(field: I): PromiseOr<boolean>;
  visibleCb?(field: I): PromiseOr<boolean>;
};

export type BaseInteractiveElementInstance<
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  N extends ElementName = ElementName,
  RT = unknown,
> = PlainElementInstance<C, N> & {
  ref: Ref<RT>;

  readonly form: FormInstance;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly hooks: HookManagerInstance<InteractiveElementHooks<C, N, RT> | any>;

  readonly label?: string;
  readonly lazy: boolean;

  readonly isDirty: Ref<boolean>;
  readonly isSuspended: Ref<boolean>;
  readonly isTouched: Ref<boolean>;

  readonly isDisabled: Ref<boolean>;
  readonly isOptional: Ref<boolean>;
  readonly isVisible: Ref<boolean>;

  /**
   * Determines whether the field is valid.
   */
  readonly isValid: Ref<boolean>;

  /**
   * Validators used to compute the value of isValid.
   */
  readonly validators: Validator<C, N, RT>[];

  /**
   * Resets the field.
   */
  readonly reset: () => PromiseOr<void>;

  readonly formattedErrors: () => string[];
};

export type InteractiveElementInstance<
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  N extends ElementName = ElementName,
  RT = unknown,
> = BaseInteractiveElementInstance<C, N, RT> & InteractiveElementHooks<C, N, RT>;
