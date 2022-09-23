import {Form} from './.';
import {ComponentOrHtmlElement} from '../plain-element';
import {reactive} from 'vue';
import {Field, FieldInstance} from './Field';
import {FieldName, FieldOrElement} from '../../types';

export const defineField = <N extends FieldName, RT, C extends ComponentOrHtmlElement>(
  form: Form<N, RT, C>,
  fieldName: N,
  fieldConfig: FieldOrElement<N, C, RT>,
): FieldInstance<N, RT, C> => {
  const field = new Field<N, RT, C>(form, fieldName, fieldConfig);

  return reactive(field);
};
