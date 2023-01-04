import {ComponentOrHtmlElement, ElementName} from '../../types';
import {Validator} from '../../form';

export const firstNameNotDuane = (): Validator<ComponentOrHtmlElement, ElementName, string> => ({
  validate: (_, value) => !String(value).startsWith('Duane'),
  errorMessage: 'Duane, we told you to never come back here.',
});

export const canNotContainX = (): Validator<ComponentOrHtmlElement, ElementName, string> => ({
  validate: (_, value) => !String(value).includes('x'),
  errorMessage: 'The letter "x" is too negative and is not allowed.',
});
