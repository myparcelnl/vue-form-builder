/* eslint-disable @typescript-eslint/no-explicit-any */
import {type Component, type VNode, type Ref, type ComputedRef} from 'vue';
import {type UnwrapNestedRefs} from '@vue/reactivity';
import {type AnyAttributes, type FunctionOr, type ComponentProps} from '@myparcel-vfb/utils';
import {type ReadonlyOr, type PromiseOr} from '@myparcel/ts-utils';
import {
  type InteractiveElementConfiguration,
  type InteractiveElementInstance,
  type PlainElementConfiguration,
  type PlainElementInstance,
  type FormInstance,
} from '../form';
import {type ComponentLifecycleHooks} from './other.types';

export type ElementName = string | undefined;

export type ComponentOrHtmlElement<Props extends ComponentProps = ComponentProps> = string | Component<Props>;

export type ElementSlots = Record<string, (() => VNode | string | VNode[]) | VNode | string | VNode[]>;

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
  slots?: ElementSlots;

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
