import {ComponentOrHtmlElement} from '../types';
import {markRaw} from 'vue';

export const markComponentAsRaw = <T extends boolean | undefined | ComponentOrHtmlElement>(value: T): T | undefined => {
  if (!value) {
    return undefined;
  }

  if (typeof value === 'string' || typeof value === 'boolean') {
    return value;
  }

  return markRaw(value);
};
