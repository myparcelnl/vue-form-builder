import {type ComputedRef} from 'vue';
import {type FunctionOr} from '@myparcel-vfb/utils';
import {type PromiseOr} from '@myparcel/ts-utils';
import {type InteractiveElementInstance} from '../interactive-element';
import {type ComponentOrHtmlElement, type ElementName} from '../../types';

export type ValidateFunction<
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  N extends ElementName = ElementName,
  RT = unknown,
> = (field: InteractiveElementInstance<C, N, RT>, value: RT) => PromiseOr<boolean>;

export interface MultiValidator<
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  N extends ElementName = ElementName,
  RT = unknown,
> {
  validators: SingleValidator<C, N, RT>[];
}

export interface ComputedValidator {
  isValid: ComputedRef<boolean>;
}

export interface Validator<
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  N extends ElementName = ElementName,
  RT = unknown,
> {
  validate: ValidateFunction<C, N, RT>;
  errorMessage?: FunctionOr<string>;
  precedence?: number;
}

export interface ValidatorWithPrecedence<
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  N extends ElementName = ElementName,
  RT = unknown,
> extends Validator<C, N, RT> {
  precedence: number;
}

export type SingleValidator<
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  N extends ElementName = ElementName,
  RT = unknown,
> = Validator<C, N, RT> | ValidatorWithPrecedence<C, N, RT> | ComputedValidator;

export type FieldValidator<
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  N extends ElementName = ElementName,
  RT = unknown,
> = MultiValidator<C, N, RT> | SingleValidator<C, N, RT>;
