import {expect} from 'vitest';
import {type FormInstance} from '../../form';

export const formIsInvalid = (form: FormInstance): void => {
  expect(form.isValid.value).toBe(false);
};

export const formIsValid = (form: FormInstance): void => {
  expect(form.isValid.value).toBe(true);
};
