import {type Raw, markRaw} from 'vue';
import {type ComponentOrHtmlElement} from '../types';

export const markComponentAsRaw = <T extends boolean | undefined | ComponentOrHtmlElement>(
  value: T,
): undefined | Raw<T> => {
  if (typeof value === 'string' || typeof value === 'boolean') {
    return value;
  }

  if (!value) {
    return undefined;
  }

  return markRaw(value);
};
