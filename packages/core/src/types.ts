import {ComponentOrHtmlElement, ElementConfig, FieldInstance} from './form';
import {PromiseOr} from '@myparcel/vue-form-builder-shared';
import {Ref} from 'vue';

export type FieldName = string | undefined;

export type ElementWithName<C extends ComponentOrHtmlElement, N extends FieldName = FieldName> = ElementConfig<C> & {
  name: N;
};

export type FieldWithNameAndRef<
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  N extends FieldName = FieldName,
  RT = unknown,
> = ElementConfig<C> & {
  name: N;
  ref: Ref<RT>;

  sanitize?: (field: FieldInstance<C, N, RT>, value: RT) => PromiseOr<RT>;
  validate?: (field: FieldInstance<C, N, RT>, value: RT) => PromiseOr<boolean>;

  label?: string;
  optional?: boolean;
  visible?: boolean;
};

export type PlainElement<C extends ComponentOrHtmlElement = ComponentOrHtmlElement> = ElementConfig<C> & {
  name?: never;
  ref?: never;
};

export type NamedElementOrField<
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  N extends FieldName = FieldName,
  RT = unknown,
> = ElementWithName<C, N> | FieldWithNameAndRef<C, N, RT>;

export type FieldOrElement<
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  N extends FieldName = FieldName,
  RT = unknown,
> = NamedElementOrField<C, N, RT> | PlainElement<C>;
