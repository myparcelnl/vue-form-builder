import {ComponentOrHtmlElement, ElementName} from '../../types';
import {Validator} from './validator.types';

export const isRequired = <
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  N extends ElementName = ElementName,
  RT = unknown,
>(
  errorMessage: string,
): Validator<C, N, RT> => ({
  validate: Boolean,
  errorMessage,
});
