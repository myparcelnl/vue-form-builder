import {type ComponentOrHtmlElement, type ElementName, type Validator} from '@myparcel-vfb/core';

export const regexValidator = (regex: RegExp): Validator<ComponentOrHtmlElement, ElementName, string> => ({
  validate: (_, value) => regex.test(value),
  errorMessage: `Value must match ${regex.toString()}`,
});
