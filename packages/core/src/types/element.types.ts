import {PlainElementHooks, PlainElementInstance} from '../form';
import {Component} from 'vue';
import {ComponentLifecycleHooks} from '../composables';
import {ComponentOrHtmlElement} from './other.types';
import {FormComponentProps} from './field.types';

export type ComponentHooks<I = unknown, C extends ComponentOrHtmlElement = ComponentOrHtmlElement> = C extends Component
  ? ComponentLifecycleHooks<I>
  : never;

export type Props<C extends ComponentOrHtmlElement = ComponentOrHtmlElement> = C extends Component
  ? FormComponentProps<C>
  : never;

export type BaseElementConfiguration<
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  I extends PlainElementInstance = PlainElementInstance,
> = {
  /**
   * HTML element or Vue component. Can be any type of component that renders as a Vue fragment, including JSX templates.
   */
  component: C;

  /**
   * Props to be passed to the component.
   */
  props?: Props<C>;
} & Partial<PlainElementHooks<I>>;
