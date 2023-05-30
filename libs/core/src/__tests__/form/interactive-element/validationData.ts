/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {ref} from 'vue';
import {type Validator, defineField} from '../../../form';

export const firstNameNotJohnValidator = (): Validator => ({
  validate: (_, value) => !String(value).startsWith('John'),
  errorMessage: 'John, we do not accept you',
});

export const nameNotDonaldMack = (precedence: number): Validator => ({
  precedence,
  validate: (_, value) => !String(value).startsWith('Donald Mack'),
  errorMessage: 'Donald Mack, we specifically do not send to you.',
});

export const nameNotDonald = (precedence: number): Validator => ({
  precedence,
  validate: (_, value) => !String(value).startsWith('Donald'),
  errorMessage: 'Donald, we do not send to you.',
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
