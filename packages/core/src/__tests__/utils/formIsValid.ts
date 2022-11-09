import {DOMWrapper} from '@vue/test-utils';
import {FormInstance} from '../../../../form-builder/src';
import {expect} from 'vitest';

export const formIsInvalid = (formElement: DOMWrapper<HTMLElement>, form: FormInstance): void => {
  expect(form.isValid.value).toBe(false);
  expect(formElement.classes()).toContain('invalid');
  expect(formElement.classes()).not.toContain('valid');
};

export const formIsValid = (formElement: DOMWrapper<HTMLElement>, form: FormInstance): void => {
  expect(form.isValid.value).toBe(true);
  expect(formElement.classes()).toContain('valid');
  expect(formElement.classes()).not.toContain('invalid');
};
