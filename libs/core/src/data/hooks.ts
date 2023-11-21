export enum FormHook {
  BeforeValidate = 'beforeValidate',
  AfterValidate = 'afterValidate',

  BeforeSubmit = 'beforeSubmit',
  AfterSubmit = 'afterSubmit',

  BeforeReset = 'beforeReset',
  AfterReset = 'afterReset',

  ElementChange = 'afterElementChange',

  BeforeAddElement = 'beforeAddElement',
  AfterAddElement = 'afterAddElement',
}

export const FORM_HOOKS = Object.freeze(Object.values(FormHook)) as readonly FormHook[];

export const COMPONENT_LIFECYCLE_HOOKS = [
  'onCreated',
  'onActivated',
  'onBeforeMount',
  'onBeforeUnmount',
  'onBeforeUpdate',
  'onDeactivated',
  'onMounted',
  'onUnmounted',
  'onUpdated',
] as const;

export const PLAIN_ELEMENT_HOOKS = ['blur', 'click', 'focus', ...COMPONENT_LIFECYCLE_HOOKS] as const;

export const INTERACTIVE_ELEMENT_HOOKS = [
  'blur',
  'focus',
  'sanitize',
  'update',
  'validate',
  ...PLAIN_ELEMENT_HOOKS,
] as const;
