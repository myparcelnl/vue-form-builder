import {COMPONENT_LIFECYCLE_HOOKS} from '../../data';

export const PLAIN_ELEMENT_HOOKS = ['blur', 'click', 'focus', ...COMPONENT_LIFECYCLE_HOOKS] as const;
