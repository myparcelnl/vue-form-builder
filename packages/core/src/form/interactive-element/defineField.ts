import {ComponentOrHtmlElement, FieldConfiguration, FieldName} from '../../types';

type DefineField = {
  <C extends ComponentOrHtmlElement = ComponentOrHtmlElement, N extends FieldName = undefined, RT = never>(
    field: FieldConfiguration<C, N, RT>,
  ): FieldConfiguration<C, N, RT>;
};

/**
 * Define a field for use in a form.
 *
 * @example defineField({name: 'name', component: 'input', props: {type: 'text'}})
 */
export const defineField: DefineField = (field) => {
  return field;
};
