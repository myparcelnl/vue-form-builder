/* eslint-disable @typescript-eslint/no-explicit-any */
import {type ComponentSlots} from 'vue-component-type-helpers';
import {type Component, type Ref, type ComputedRef, type Slots} from 'vue';
import {type UnwrapNestedRefs} from '@vue/reactivity';
import {type AnyAttributes, type FunctionOr} from '@myparcel-vfb/utils';
import {type ReadonlyOr, type PromiseOr} from '@myparcel/ts-utils';
import {type PlainElementInstance, type PlainElementConfiguration} from './plain-element.types';
import {type InteractiveElementInstance, type InteractiveElementConfiguration} from './interactive-element.types';
import {type FormInstance} from './form.types';
import {type ComponentLifecycleHooks, type ComponentOrHtmlElement, type ComponentProps} from './component.types';

export type ElementName = string | undefined;

export type ElementSlots = Slots;

export interface BaseElementConfiguration<Props extends ComponentProps = ComponentProps> {
  name?: ElementName;

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
}

export interface BaseElementHooks<I extends BaseElementInstance = BaseElementInstance>
  extends ComponentLifecycleHooks<I> {
  beforeFocus?(instance: I, event: FocusEvent): PromiseOr<void>;
  focus?(instance: I, event: FocusEvent): PromiseOr<void>;
  afterFocus?(instance: I, event: FocusEvent): PromiseOr<void>;

  beforeClick?(instance: I): PromiseOr<void>;
  click?(instance: I, event: MouseEvent): PromiseOr<void>;
  afterClick?(instance: I): PromiseOr<void>;

  visibleWhen?(instance: I): PromiseOr<boolean>;
}

export interface BaseElementInstance<Props extends ComponentProps = ComponentProps> {
  readonly name: ElementName;
  readonly component: ComponentOrHtmlElement<Props>;

  readonly wrapper: boolean | Component;

  readonly form: FormInstance;
  readonly props: UnwrapNestedRefs<Props>;
  readonly slots?: ElementSlots;

  readonly isVisible: Ref<boolean>;
  readonly teleportSelector?: string;

  readonly label?: string;
  readonly errorsTarget?: string;
  readonly errors: Ref<FunctionOr<string>[]>;
  readonly formattedErrors: ComputedRef<string[]>;

  readonly attributes: UnwrapNestedRefs<AnyAttributes>;

  setVisible(value: boolean): void;
  resetValidation(): void;
}

export type AnyElementInstance<Type = unknown, Props extends ComponentProps = ComponentProps> =
  | InteractiveElementInstance<Type, Props>
  | PlainElementInstance<Props>;

export type AnyElementConfiguration<Type = unknown, Props extends ComponentProps = ComponentProps> =
  | PlainElementConfiguration<Props>
  | InteractiveElementConfiguration<Type, Props>;

export type ResolvedElementConfiguration<
  Type = unknown,
  Props extends ComponentProps = ComponentProps,
> = Type extends never ? PlainElementConfiguration<Props> : InteractiveElementConfiguration<Type, Props>;

export interface CreatedElement<Type = unknown, Props extends ComponentProps = ComponentProps> {
  Component: Component<Props>;
  field: ResolvedElementConfiguration<Type, Props>;
  ref: Type extends undefined ? undefined : Ref<Type>;
}

export interface ModularCreatedElement<Type = unknown, Props extends ComponentProps = ComponentProps>
  extends CreatedElement<Type, Props> {
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
