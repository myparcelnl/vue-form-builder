import {
  type AnyElementConfiguration,
  type ComponentOrHtmlElement,
  type ElementName,
  type ResolvedElementConfiguration,
} from '../types';

/**
 * Define a field for use in a form with fields array.
 *
 * @example defineField({name: 'name', component: 'input', props: {type: 'text'}})
 */
export const defineField = <
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  N extends ElementName = ElementName,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  RT = any,
>(
  field: AnyElementConfiguration<C, N, RT>,
): ResolvedElementConfiguration<C, N, RT> => {
  return field as ResolvedElementConfiguration<C, N, RT>;
};
