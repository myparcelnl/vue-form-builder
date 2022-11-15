import {ComponentOrHtmlElement, ElementName} from './element.types';
import {InteractiveElementInstance} from '../form';
import {PromiseOr} from '@myparcel/ts-utils';

/**
 * TODO: This is a temporary solution to avoid errors.
 *  We need to find a way to infer the types from the input form configuration.
 */
export type FieldsToModel<
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  N extends ElementName = ElementName,
  RT = unknown,
> = {
  [K in N extends string ? N | string : string]: InteractiveElementInstance<C, N, RT>;
};

export type ComponentLifecycleHooks<I = unknown> = {
  onActivated: (instance: I) => PromiseOr<void>;
  onBeforeMount: (instance: I) => PromiseOr<void>;
  onBeforeUnmount: (instance: I) => PromiseOr<void>;
  onBeforeUpdate: (instance: I) => PromiseOr<void>;
  onCreated: (instance: I) => PromiseOr<void>;
  onDeactivated: (instance: I) => PromiseOr<void>;
  onMounted: (instance: I) => PromiseOr<void>;
  onUnmounted: (instance: I) => PromiseOr<void>;
  onUpdated: (instance: I) => PromiseOr<void>;
};
