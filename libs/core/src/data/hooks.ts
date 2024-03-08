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

export const COMPONENT_LIFECYCLE_HOOKS = Object.freeze([
  'onCreated',
  'onActivated',
  'onBeforeMount',
  'onBeforeUnmount',
  'onBeforeUpdate',
  'onDeactivated',
  'onMounted',
  'onUnmounted',
  'onUpdated',
] as const);

export const FIELD_HOOKS = Object.freeze([
  ...COMPONENT_LIFECYCLE_HOOKS,
  'blur',
  'click',
  'focus',
  'focus',
  'sanitize',
  'update',
  'validate',
] as const);
