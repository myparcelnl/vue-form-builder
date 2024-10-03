import {type Validator} from '@myparcel/vue-form-builder';

export const regexValidator = (regex: RegExp): Validator<string> => ({
  validate: (_, value) => regex.test(value),
  errorMessage: `Value must match ${regex.toString()}`,
});
