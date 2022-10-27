import {Validator} from '@myparcel/vue-form-builder';

export const isAlphaNumeric = (): Validator => ({
  validate: (value) => /^[A-z\d]+$/.test(String(value)),
  errorMessage: 'This field must be alphanumeric.',
});

export const isRequired = (): Validator => ({
  validate: (value) => Boolean(value),
  errorMessage: 'This field is required.',
});

export const firstNameNotDuane = (): Validator<string> => ({
  validate: (_, value) => value.startsWith('Duane'),
  errorMessage: 'Duane, we told you to never come back here.',
});

export const canNotContainX = (): Validator<string> => ({
  validate: (_, value) => !value.includes('x'),
  errorMessage: 'The letter "x" is too negative and is not allowed.',
});
