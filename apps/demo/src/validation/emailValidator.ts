import {type ComponentOrHtmlElement, type ElementName, type Validator} from '@myparcel-vfb/core';

export const emailValidator = (): Validator<ComponentOrHtmlElement, ElementName, string> => ({
  validate: (_, value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
  errorMessage: `Does this look like a valid email address to you?`,
});
