import {ComponentOrHtmlElement, FieldInstance} from '../form';
import {FieldName} from './field.types';
import {PromiseOr} from '@myparcel/vue-form-builder-utils';

export type ObjectWithSingleValidator<
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  N extends FieldName = FieldName,
  RT = unknown,
> = {
  validate: ValidateFunction<C, N, RT>;
};

export type ObjectWithMultipleValidators<
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  N extends FieldName = FieldName,
  RT = unknown,
> = {
  validators: Validator<C, N, RT>[];
};

export type Validator<
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  N extends FieldName = FieldName,
  RT = unknown,
> = {
  validate: ValidateFunction<C, N, RT>;
  errorMessage: string;
};

export type ValidateFunction<
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  N extends FieldName = FieldName,
  RT = unknown,
> = (field: FieldInstance<C, N, RT>, value: RT) => PromiseOr<boolean>;
