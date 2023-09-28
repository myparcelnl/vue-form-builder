import {inject} from 'vue';
import {type AnyElementInstance} from '../types';
import {INJECT_ELEMENT} from '../data';

export const useElement = (): AnyElementInstance => {
  const element = inject(INJECT_ELEMENT);

  if (!element) {
    throw new Error('No element found.');
  }

  return element;
};
