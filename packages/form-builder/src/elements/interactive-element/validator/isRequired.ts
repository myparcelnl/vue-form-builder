import {Validator} from '../index';

export const isRequired = (): Validator => {
  return {
    validate: (value) => Boolean(value),
    errorMessage: 'This field is required',
  };
};
