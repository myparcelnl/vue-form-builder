import {ComponentOrHtmlElement, ElementConfig, FieldInstance} from './form';
import {Ref, UnwrapRef, ref} from 'vue';
import {PromiseOr} from '@myparcel/vue-form-builder-shared';

export type FieldName = string | undefined;

export type FieldWithName<N extends FieldName = FieldName, EC extends ElementConfig = ElementConfig> = EC & {
  name: N;
};

export type FieldWithNameAndRef<
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  N extends FieldName = FieldName,
  RT = unknown,
  EC extends ElementConfig = ElementConfig,
> = EC & {
  name: N;
  ref: Ref<RT>;

  sanitize?: (field: FieldInstance<N, RT, C>, value: RT) => PromiseOr<RT>;
  validate?: (field: FieldInstance<N, RT, C>, value: RT) => PromiseOr<boolean>;

  label?: string;
  optional?: boolean;
  visible?: boolean;
};

export type BaseField<C> = {
  name?: never;
  ref?: never;
};

export type FieldOrElement<
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  N extends FieldName = FieldName,
  RT = unknown,
> = FieldWithName<N> | FieldWithNameAndRef<C, N, RT> | BaseField<C>;
