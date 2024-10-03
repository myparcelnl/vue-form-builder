import {type Validator} from '@myparcel/vue-form-builder';

export const stringLengthValidator = (minLength: number, maxLength?: number): Validator<string> => {
  return {
    validate: (_, value) => value.length >= minLength && value.length <= (maxLength ?? Infinity),
    errorMessage: maxLength
      ? `Value must be between ${minLength} and ${maxLength} characters long.`
      : `Value must be at least ${minLength} characters long.`,
  };
};
