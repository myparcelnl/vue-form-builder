import {AnyElementInstance} from '../types';
import {INJECT_ELEMENT} from '../services';
import {inject} from 'vue';

export const useElement = (): AnyElementInstance => {
  const element = inject(INJECT_ELEMENT);

  if (!element) {
    throw new Error('No element found.');
  }

  return element;
};
