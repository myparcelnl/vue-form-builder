import {FormInstance} from '../../form';
import {expect} from 'vitest';

export const formIsInvalid = (form: FormInstance): void => {
  expect(form.isValid.value).toBe(false);
};

export const formIsValid = (form: FormInstance): void => {
  expect(form.isValid.value).toBe(true);
};
