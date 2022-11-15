/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  InteractiveElementConfiguration,
  InteractiveElementInstance,
  PlainElementConfiguration,
  PlainElementInstance,
} from '../form';
import {Component} from 'vue';
import {ComponentLifecycleHooks} from './other.types';
import {ComponentProps} from '@myparcel-vfb/utils';
import {MakeOptional} from '@myparcel/ts-utils';

export type ElementName = string | undefined;

export type ComponentOrHtmlElement = string | Component;

export type ComponentHooks<C extends ComponentOrHtmlElement = ComponentOrHtmlElement, I = unknown> = C extends Component
  ? ComponentLifecycleHooks<I>
  : unknown;

export type ElementProps<C extends ComponentOrHtmlElement = ComponentOrHtmlElement> = C extends Component
  ? Omit<MakeOptional<ComponentProps<C>, 'name' | 'label' | 'id'>, 'modelValue'>
  : never;

export type BaseElementConfiguration<C extends ComponentOrHtmlElement = ComponentOrHtmlElement> = {
  /**
   * HTML element or Vue component. Can be any type of component that renders as a Vue fragment, including JSX
   * templates.
   */
  component: C;

  /**
   * ElementProps to be passed to the component.
   */
  props?: ElementProps<C>;

  /**
   * Hooks to be registered.
   */
  hookNames?: string[];
};

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
