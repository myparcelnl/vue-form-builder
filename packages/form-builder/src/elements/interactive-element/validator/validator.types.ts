import {ComputedRef} from 'vue';
import {InteractiveElementInstance} from '../InteractiveElement.types';
import {PromiseOr} from '@myparcel-vfb/utils';
import {ComponentOrHtmlElement, ElementName} from '../../element.types';

export type ValidateFunction<
  RT = unknown,
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  N extends ElementName = ElementName,
> = (field: InteractiveElementInstance<C, N, RT>, value: RT) => PromiseOr<boolean>;

export type ComputedValidator = {isValid: ComputedRef<boolean>};

export type MultiValidator<
  RT = unknown,
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  N extends ElementName = ElementName,
> = {validators: Validator<RT, C, N>[]};

export type SingleValidator<
  RT = unknown,
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  N extends ElementName = ElementName,
> = Validator<RT, C, N>;

export type FieldValidator<
  RT = unknown,
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  N extends ElementName = ElementName,
> = Partial<ComputedValidator | MultiValidator<RT, C, N> | SingleValidator<RT, C, N>>;

export type Validator<
  RT = unknown,
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  N extends ElementName = ElementName,
> = {
  validate: ValidateFunction<RT, C, N>;
  errorMessage?: string;
};
