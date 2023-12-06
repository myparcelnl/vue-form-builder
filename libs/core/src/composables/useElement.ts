import {inject} from 'vue';
import {type AnyElementInstance} from '../types';
import {INJECT_ELEMENT} from '../symbols';

export const useElement = <I extends AnyElementInstance>(): I => {
  const element = inject(INJECT_ELEMENT) as I | undefined;

  if (!element) {
    throw new Error('No element found.');
  }

  return element;
};
