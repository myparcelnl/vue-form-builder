import {type Validator} from '@myparcel-vfb/core';
import {type OneOrMore, toArray} from '@myparcel/ts-utils';

export const stringNotContainsValidator = (search: OneOrMore<string>): Validator<string> => {
  const array = toArray(search);

  return {
    validate: (_, value) => array.every((search) => !value.includes(search)),
    errorMessage: `Value must not contain "${array.join('", "')}"`,
  };
};
