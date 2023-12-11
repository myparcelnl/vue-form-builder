import {type Validator} from '@myparcel/vue-form-builder/ts';
import {type OneOrMore, toArray} from '@myparcel/ts-utils';

export const stringContainsValidator = (search: OneOrMore<string>): Validator<string> => {
  const array = toArray(search);

  return {
    validate: (_, value) => array.every((search) => value.includes(search)),
    errorMessage: `Value must contain "${array.join('", "')}"`,
  };
};
