import {BaseElementConfiguration, ComponentOrHtmlElement, FieldName} from '../../types';

export type NamedElementConfiguration<
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  N extends FieldName = FieldName,
> = BaseElementConfiguration<C> & {
  name: N;
  ref?: never;
};
