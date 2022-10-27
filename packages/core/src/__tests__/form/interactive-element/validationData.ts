import {Validator, defineField} from '../../../form';
import {ref} from 'vue';

export const firstNameNotJohnValidator = (): Validator<string> => ({
  validate: (_, value) => value.startsWith('John'),
  errorMessage: 'John, we do not accept you',
});

export const canNotContainEValidator = (): Validator<string> => ({
  validate: (_, value) => !value.includes('e'),
  errorMessage: 'The most common letter in the English language is not allowed',
});

export const fieldWithMultipleValidators = () =>
  defineField({
    name: 'name',
    component: 'input',
    ref: ref(''),
    validators: [firstNameNotJohnValidator(), canNotContainEValidator()],
  });

export const fieldWithComputedValidator = () =>
  defineField({
    name: 'name',
    component: 'input',
    ref: ref(''),
    validators: [firstNameNotJohnValidator(), canNotContainEValidator()],
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
