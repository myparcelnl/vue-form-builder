import {type AnyElementConfiguration, type ResolvedElementConfiguration, type ComponentProps} from '../types';

/**
 * Define a field for use in a form with fields array.
 *
 * @example defineField({name: 'name', component: 'input', props: {type: 'text'}})
 */
export const defineField = <Type = unknown, Props extends ComponentProps = ComponentProps>(
  field: AnyElementConfiguration<Type, Props>,
): ResolvedElementConfiguration<Type, Props> => field as ResolvedElementConfiguration<Type, Props>;
