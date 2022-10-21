import {ComponentOrHtmlElement, ElementConfig, FieldInstance} from './form';
import {Component, Ref} from 'vue';
import {ComponentProps, MakeOptional, PromiseOr} from '@myparcel/vue-form-builder-utils';

export type FieldName = string | undefined;

export type ElementWithName<
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  N extends FieldName = FieldName,
> = ElementConfig<C> & {
  name: N;
  ref?: never;
};

export type IPlainElement<C extends ComponentOrHtmlElement = ComponentOrHtmlElement> = ElementConfig<C> & {
  name?: never;
  ref?: never;
};

export type FieldWithNameAndRef<
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  N extends FieldName = FieldName,
  RT = unknown,
> = ElementConfig<C> & {
  name: N;
  ref: Ref<RT>;
  label?: string;

  optional?: boolean;
  visible?: boolean;

  sanitize?: (field: FieldInstance<C, N, RT>, value: RT) => PromiseOr<RT>;
  validate?: (field: FieldInstance<C, N, RT>, value: RT) => PromiseOr<boolean>;
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
> = NamedElementOrField<C, N, RT> | IPlainElement<C>;

export type MagicFormProps<C extends Component> = {
  props?: Omit<MakeOptional<ComponentProps<C>, 'name' | 'label' | 'id'>, 'modelValue'>;
};
