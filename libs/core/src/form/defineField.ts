import {
  type AnyElementConfiguration,
  type ComponentOrHtmlElement,
  type ElementName,
  type ResolvedElementConfiguration,
} from '../types';

/**
 * Define a field for use in a form.
 *
 * @example defineField({name: 'name', component: 'input', props: {type: 'text'}})
 */
export const defineField = <
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  N extends ElementName = ElementName,
  RT = unknown,
>(
  field: AnyElementConfiguration<C, N, RT>,
): ResolvedElementConfiguration<C, N, RT> => {
  return field as ResolvedElementConfiguration<C, N, RT>;
};
