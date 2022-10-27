import {Component, UnwrapNestedRefs} from 'vue';
import {InteractiveElementInstance, PlainElementInstance} from '../form';
import {FieldName} from './field.types';

export type ComponentOrHtmlElement = string | Component;

export type AnyElementInstance<
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  N extends FieldName = FieldName,
  RT = unknown,
> = InteractiveElementInstance<C, N, RT> | PlainElementInstance<C, N>;

// TODO: This is a temporary solution to avoid errors.
//  We need to find a way to infer the types from the input form configuration.
export type FieldsToModel<
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  N extends FieldName = FieldName,
  RT = unknown,
> = {
  [K in string]: UnwrapNestedRefs<InteractiveElementInstance<C, N, RT>>;
};

export type ResolvedElementInstance<
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  N extends FieldName = FieldName,
  RT = unknown,
> = InteractiveElementInstance<C, N, RT> | PlainElementInstance<C, N>;
