import {type ComponentOrHtmlElement, type ElementName, type Validator} from '@myparcel-vfb/core';

export const stringLengthValidator = (
  minLength: number,
  maxLength?: number,
): Validator<ComponentOrHtmlElement, ElementName, string> => {
  return {
    validate: (_, value) => value.length >= minLength && value.length <= (maxLength ?? Infinity),
    errorMessage: maxLength
      ? `Value must be between ${minLength} and ${maxLength} characters long.`
      : `Value must be at least ${minLength} characters long.`,
  };
};
