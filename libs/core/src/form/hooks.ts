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

export const FORM_HOOKS = Object.freeze(Object.values(FormHook));
