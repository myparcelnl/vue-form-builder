import {FieldName, FieldOrElement} from '../../types';
import {ComponentOrHtmlElement} from '../plain-element';
import {isOfType} from '@myparcel/vue-form-builder-utils';
import {ref} from 'vue';

type DefineField = {
  <C extends ComponentOrHtmlElement, N extends FieldName, RT>(
    name: N,
    config: Omit<FieldOrElement<C, N, RT>, 'name'>,
  ): typeof config;

  <C extends ComponentOrHtmlElement, N extends FieldName, RT>(
    config: FieldOrElement<C, N, RT>,
    param2?: never,
  ): typeof config;
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const defineField: DefineField = (param1, param2) => {
  if (isOfType<FieldOrElement>(param1, 'component')) {
    return param1;
  }

  return {
    name: param1,
    ...param2,
  };
};

defineField('boop', {
  component: 'input',
});

defineField({
  name: 'boop',
  component: 'input',
  ref: ref('hello'),
  sanitize: (instance, value) => value.trim(),
});
