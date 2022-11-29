import {ComponentOrHtmlElement, ElementName, Validator} from '@myparcel/vue-form-builder';

export const isAlphaNumeric = (): Validator<ComponentOrHtmlElement, ElementName, string> => ({
  validate: (value) => /^[A-z\d]+$/.test(String(value)),
  errorMessage: 'This field must be alphanumeric.',
});

export const isRequired = (): Validator<ComponentOrHtmlElement, ElementName, string> => ({
  validate: (value) => Boolean(value),
  errorMessage: 'This field is required.',
});

export const firstNameNotDuane = (): Validator<ComponentOrHtmlElement, ElementName, string> => ({
  validate: (_, value) => !String(value).startsWith('Duane'),
  errorMessage: 'Duane, we told you to never come back here.',
});

export const canNotContainX = (): Validator<ComponentOrHtmlElement, ElementName, string> => ({
  validate: (_, value) => !String(value).includes('x'),
  errorMessage: 'The letter "x" is too negative and is not allowed.',
});
