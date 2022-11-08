/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {Validator, defineField} from '../../../form';
import {ref} from 'vue';

export const firstNameNotJohnValidator = (): Validator => ({
  validate: (_, value) => !String(value).startsWith('John'),
  errorMessage: 'John, we do not accept you',
});

export const canNotContainLetterValidator = (): Validator => ({
  validate: (_, value) => !String(value).includes('e'),
  errorMessage: 'The most common letter in the English language is not allowed',
});

export const fieldWithMultipleValidators = () =>
  defineField({
    name: 'name',
    component: 'input',
    ref: ref(''),
    validators: [firstNameNotJohnValidator(), canNotContainLetterValidator()],
  });

export const fieldWithComputedValidator = () =>
  defineField({
    name: 'name',
    component: 'input',
    ref: ref(''),
    validators: [firstNameNotJohnValidator(), canNotContainLetterValidator()],
  });

export const fieldWithSingleValidator = () =>
  defineField({
    name: 'name',
    component: 'input',
    ref: ref(''),
    label: 'Name',
    validate: (_, value) => Boolean(value),
    errorMessage: 'This field is required',
  });
