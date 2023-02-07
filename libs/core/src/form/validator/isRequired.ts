import {ComponentOrHtmlElement, ElementName} from '../../types';
import {FunctionOr} from '@myparcel-vfb/utils/src';
import {InteractiveElementInstance} from '../interactive-element';
import {Validator} from './validator.types';

export const isRequired = <
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  N extends ElementName = ElementName,
  RT = unknown,
>(
  errorMessage: FunctionOr<string>,
): Validator<C, N, RT> => ({
  validate: (field: InteractiveElementInstance<C, N, RT>, value: RT): boolean => {
    return !(value === null || value === undefined || value === '');
  },
  errorMessage,
});
