import {ComponentOrHtmlElement, ElementName} from '../../../types';
import {ComputedRef} from 'vue';
import {InteractiveElementInstance} from '../InteractiveElement.types';
import {PromiseOr} from '@myparcel/ts-utils';

export type ValidateFunction<
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  N extends ElementName = ElementName,
  RT = unknown,
> = (field: InteractiveElementInstance<C, N, RT>, value: RT) => PromiseOr<boolean>;

export type ComputedValidator = {isValid: ComputedRef<boolean>};

export type MultiValidator<
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  N extends ElementName = ElementName,
  RT = unknown,
> = {validators: Validator<C, N, RT>[]};

export type SingleValidator<
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  N extends ElementName = ElementName,
  RT = unknown,
> = Validator<C, N, RT>;

export type FieldValidator<
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  N extends ElementName = ElementName,
  RT = unknown,
> = Partial<ComputedValidator | MultiValidator<C, N, RT> | SingleValidator<C, N, RT>>;

export type Validator<
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  N extends ElementName = ElementName,
  RT = unknown,
> = {
  validate: ValidateFunction<C, N, RT>;
  errorMessage?: string;
};
