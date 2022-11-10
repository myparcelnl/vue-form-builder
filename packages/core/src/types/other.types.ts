import {ComponentOrHtmlElement, ElementName} from './element.types';
import {COMPONENT_LIFECYCLE_HOOKS} from '../data/componentLifecycleHooks';
import {InteractiveElementInstance} from '../form';
import {UnwrapNestedRefs} from 'vue';
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
  [K in N extends string ? N | string : string]: UnwrapNestedRefs<InteractiveElementInstance<C, N, RT>>;
};

export type ComponentLifecycleHooks<I = unknown> = {
  [k in typeof COMPONENT_LIFECYCLE_HOOKS[number]]?: (instance: I) => PromiseOr<void>;
};
