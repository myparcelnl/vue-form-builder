import {ComponentOrHtmlElement, ElementConfig, FieldInstance} from './form';
import {PromiseOr} from '@myparcel/vue-form-builder-utils';
import {Ref} from 'vue';

export type FieldIdentifier = string | undefined;

export type ElementWithId<
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  I extends FieldIdentifier = FieldIdentifier,
> = ElementConfig<C> & {
  id: I;
  ref?: never;
};

export type IPlainElement<C extends ComponentOrHtmlElement = ComponentOrHtmlElement> = ElementConfig<C> & {
  id?: never;
  ref?: never;
};

export type FieldWithIdAndRef<
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  I extends FieldIdentifier = FieldIdentifier,
  RT = unknown,
> = ElementConfig<C> & {
  id: I;
  ref: Ref<RT>;
  label?: string;

  optional?: boolean;
  visible?: boolean;

  sanitize?: (field: FieldInstance<C, I, RT>, value: RT) => PromiseOr<RT>;
  validate?: (field: FieldInstance<C, I, RT>, value: RT) => PromiseOr<boolean>;
};

export type NamedElementOrField<
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  I extends FieldIdentifier = FieldIdentifier,
  RT = unknown,
> = ElementWithId<C, I> | FieldWithIdAndRef<C, I, RT>;

export type FieldOrElement<
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  I extends FieldIdentifier = FieldIdentifier,
  RT = unknown,
> = NamedElementOrField<C, I, RT> | IPlainElement<C>;
