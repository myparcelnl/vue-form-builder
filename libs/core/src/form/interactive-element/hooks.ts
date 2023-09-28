import {PLAIN_ELEMENT_HOOKS} from '../plain-element';

export const INTERACTIVE_ELEMENT_HOOKS = [
  'blur',
  'focus',
  'sanitize',
  'update',
  'validate',
  ...PLAIN_ELEMENT_HOOKS,
] as const;
