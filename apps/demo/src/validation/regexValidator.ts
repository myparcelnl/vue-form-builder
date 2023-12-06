import {type Validator} from '@myparcel-vfb/core';

export const regexValidator = (regex: RegExp): Validator<string> => ({
  validate: (_, value) => regex.test(value),
  errorMessage: `Value must match ${regex.toString()}`,
});
