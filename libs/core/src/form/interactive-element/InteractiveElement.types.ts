import {type Ref} from 'vue';
import {type HookManagerInstance} from '@myparcel-vfb/hook-manager';
import {type PromiseOr} from '@myparcel/ts-utils';
import {type FieldValidator} from '../validator';
import {type BasePlainElementInstance, PLAIN_ELEMENT_HOOKS} from '../plain-element';
import {type BaseElementConfiguration, type ComponentOrHtmlElement, type ElementName, type ToRecord} from '../../types';

export interface BaseInteractiveElementConfiguration<
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  N extends ElementName = ElementName,
  RT = unknown,
> extends BaseElementConfiguration<C>,
    InteractiveElementHooks<C, N, RT> {
  name: NonNullable<N>;
  ref: Ref<RT>;

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

export type InteractiveElementConfiguration<
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  N extends ElementName = ElementName,
  RT = unknown,
> = BaseInteractiveElementConfiguration<C, N, RT> & FieldValidator<C, N, RT>;

export const INTERACTIVE_ELEMENT_HOOKS = [
  'blur',
  'focus',
  'sanitize',
  'update',
  'validate',
  ...PLAIN_ELEMENT_HOOKS,
] as const;

export interface InteractiveElementHooks<
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  N extends ElementName = ElementName,
  RT = unknown,
  I = InteractiveElementInstance<C, N, RT>,
> /* extends PlainElementHooks<C, N, I> */ {
  beforeBlur?(instance: I): PromiseOr<void>;
  // blur?(instance: I, event: MouseEvent): PromiseOr<void>;
  afterBlur?(instance: I): PromiseOr<void>;

  beforeClick?(instance: I): PromiseOr<void>;
  // click?(instance: I, event: MouseEvent): PromiseOr<void>;
  afterClick?(instance: I): PromiseOr<void>;

  beforeFocus?(instance: I, event: FocusEvent): PromiseOr<void>;
  // focus?(instance: I, event: FocusEvent): PromiseOr<void>;
  afterFocus?(instance: I, event: FocusEvent): PromiseOr<void>;

  // reset?(field: I): PromiseOr<void>;

  beforeSanitize?(field: I, value: RT): PromiseOr<void>;
  // sanitize?(field: I, value: RT): PromiseOr<RT>;
  afterSanitize?(field: I, value: RT): PromiseOr<void>;

  beforeUpdate?(field: I, value: RT, oldValue: RT): PromiseOr<void>;
  afterUpdate?(field: I, value: RT, oldValueT: RT): PromiseOr<void>;

  beforeValidate?(field: I, value: RT): PromiseOr<void>;
  afterValidate?(field: I, value: RT, isValid: boolean): PromiseOr<void>;

  disabledWhen?(field: I): PromiseOr<boolean>;
  optionalWhen?(field: I): PromiseOr<boolean>;
  readOnlyWhen?(field: I): PromiseOr<boolean>;
  visibleWhen?(field: I): PromiseOr<boolean>;
}

export interface BaseInteractiveElementInstance<
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  N extends ElementName = ElementName,
  RT = unknown,
> extends BasePlainElementInstance<C, N> {
  ref: Ref<RT>;

  readonly lazy: boolean;

  readonly isDirty: Ref<boolean>;
  readonly isSuspended: Ref<boolean>;
  readonly isTouched: Ref<boolean>;

  readonly isDisabled: Ref<boolean>;
  readonly isOptional: Ref<boolean>;

  /**
   * Determines whether the field is valid.
   */
  readonly isValid: Ref<boolean>;

  setDisabled(disabled: boolean): void;
  setOptional(optional: boolean): void;
  setReadOnly(optional: boolean): void;
}

export type InteractiveElementInstance<
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  N extends ElementName = ElementName,
  RT = unknown,
> = BaseInteractiveElementInstance<C, N, RT> &
  InteractiveElementHooks<C, N, RT> &
  FieldValidator<C, N, RT> & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    readonly hooks: HookManagerInstance<ToRecord<InteractiveElementHooks<C, N, RT>> | any>;
  };
// export interface InteractiveElementInstance<
//   C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
//   N extends ElementName = ElementName,
//   RT = unknown,
// > extends BaseInteractiveElementInstance<C, N, RT>,
//     InteractiveElementHooks<C, N, RT> {
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   readonly hooks: HookManagerInstance<ToRecord<InteractiveElementHooks<C, N, RT>> | any>;
// }
