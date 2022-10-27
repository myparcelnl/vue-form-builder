import {ComponentOrHtmlElement, FieldName} from '../../../types';
import {ComputedRef} from 'vue';
import {InteractiveElementInstance} from '../InteractiveElement.types';
import {PromiseOr} from '@myparcel/vue-form-builder-utils';

export type ValidateFunction<
  RT = unknown,
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  N extends FieldName = FieldName,
> = (field: InteractiveElementInstance<C, N, RT>, value: RT) => PromiseOr<boolean>;

export type ComputedValidator = {isValid: ComputedRef<boolean>};

export type MultiValidator<
  RT = unknown,
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  N extends FieldName = FieldName,
> = {validators: Validator<RT | any, C, N>[]};

export type SingleValidator<
  RT = unknown,
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  N extends FieldName = FieldName,
> = Validator<RT, C, N>;

export type FieldValidator<
  RT = unknown,
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  N extends FieldName = FieldName,
> = Partial<ComputedValidator | MultiValidator<RT, C, N> | SingleValidator<RT, C, N>>;

export type Validator<
  RT = unknown,
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  N extends FieldName = FieldName,
> = {
  validate: ValidateFunction<RT, C, N>;
  errorMessage?: string;
};
