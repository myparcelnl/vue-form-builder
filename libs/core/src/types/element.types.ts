/* eslint-disable @typescript-eslint/no-explicit-any */
import {type Component, type VNode, type DefineComponent} from 'vue';
import {type AnyAttributes, type ComponentProps} from '@myparcel-vfb/utils';
import {type MakeOptional} from '@myparcel/ts-utils';
import {
  type InteractiveElementConfiguration,
  type InteractiveElementInstance,
  type PlainElementConfiguration,
  type PlainElementInstance,
} from '../form';
import {type ComponentLifecycleHooks} from './other.types';

export type ElementName = string | undefined;

export type ComponentOrHtmlElement = string | Component | DefineComponent<{}, {}, any>;

export type ComponentHooks<C extends ComponentOrHtmlElement = ComponentOrHtmlElement, I = unknown> = C extends Component
  ? ComponentLifecycleHooks<I>
  : any;

export type ElementProps<C extends ComponentOrHtmlElement = ComponentOrHtmlElement> = C extends Component
  ? Omit<MakeOptional<ComponentProps<C>, 'name' | 'label' | 'id'>, 'modelValue'> & Record<string, unknown>
  : Record<string, unknown>;

export type ElementSlots = Record<string, (() => VNode | string | VNode[]) | VNode | string | VNode[]>;

export interface BaseElementConfiguration<C extends ComponentOrHtmlElement = ComponentOrHtmlElement> {
  /**
   * Attributes to be passed to the component.
   */
  attributes?: AnyAttributes;

  /**
   * HTML element or Vue component. Can be any type of component that renders as a Vue fragment, including JSX
   * templates.
   */
  component: C;

  /**
   * Name of the field to port errors to.
   */
  errorsTarget?: string;

  /**
   * Hooks to be registered.
   */
  hookNames?: string[];

  /**
   * Element label.
   */
  label?: string;

  /**
   * Props to be passed to the component.
   */
  props?: ElementProps<C>;

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

export type AnyElementInstance<C extends ComponentOrHtmlElement = any, N extends ElementName = any, RT = any> =
  | InteractiveElementInstance<C, N, RT>
  | PlainElementInstance<C, N>;

export type AnyElementConfiguration<C extends ComponentOrHtmlElement = any, N extends ElementName = any, RT = any> =
  | PlainElementConfiguration<C, N>
  | InteractiveElementConfiguration<C, N, RT>;

export type ResolvedElementConfiguration<
  C extends ComponentOrHtmlElement = any,
  N extends ElementName = any,
  RT = any,
> = RT extends never ? PlainElementConfiguration<C> : InteractiveElementConfiguration<C, N, RT>;
