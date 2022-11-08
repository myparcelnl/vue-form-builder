import {ComponentProps, MakeOptional} from '@myparcel-vfb/utils';
import {
  InteractiveElementConfiguration,
  InteractiveElementInstance,
  PlainElementConfiguration,
  PlainElementInstance,
} from '../form';
import {Component} from 'vue';
import {ComponentLifecycleHooks} from './other.types';
import {HookNamesObject} from '@myparcel-vfb/hook-manager';

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
};

export type AnyElementInstance<
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  N extends ElementName = ElementName,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  RT = unknown,
> = InteractiveElementInstance<C, N, RT> | PlainElementInstance<C>;

export type AnyElementConfiguration<
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  N extends ElementName = ElementName,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  RT = any,
> = (PlainElementConfiguration<C> | InteractiveElementConfiguration<C, N, RT>) & HookNamesObject;

export type ResolvedElementConfiguration<
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  N extends ElementName = ElementName,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  RT = any,
> = RT extends never ? PlainElementConfiguration<C> : InteractiveElementConfiguration<C, N, RT>;
