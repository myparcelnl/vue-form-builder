import {type FieldConfiguration} from '../types/field.types';
import {type ComponentProps} from '../types/component.types';

/**
 * Define a field for use in a form with fields array.
 *
 * @example defineField({name: 'name', component: 'input', props: {type: 'text'}})
 */
export const defineField = <
  Type = unknown,
  Props extends ComponentProps = ComponentProps,
  FC extends FieldConfiguration<Type, Props> = FieldConfiguration<Type, Props>,
>(
  field: FC,
): FC => field;
