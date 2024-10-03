import {type Validator} from '@myparcel/vue-form-builder';

export const emailValidator = (): Validator<string> => ({
  validate: (_, value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
  errorMessage: `Does this look like a valid email address to you?`,
});
