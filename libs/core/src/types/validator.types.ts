import {type ComputedRef} from 'vue';
import {type FunctionOr} from '@myparcel-vfb/utils';
import {type PromiseOr} from '@myparcel/ts-utils';
import {type InteractiveElementInstance} from './interactive-element.types';
import {type ComponentProps} from './component.types';

export type ValidateFunction<Type = unknown, Props extends ComponentProps = ComponentProps> = (
  field: InteractiveElementInstance<Type, Props>,
  value: Type,
) => PromiseOr<boolean>;

export interface WithComputedValidator {
  isValid: ComputedRef<boolean>;
}

export interface WithMultiValidator<Type = unknown, Props extends ComponentProps = ComponentProps> {
  validators: Validator<Type, Props>[];
}

export interface Validator<Type = unknown, Props extends ComponentProps = ComponentProps> {
  validate: ValidateFunction<Type, Props>;
  errorMessage?: FunctionOr<string>;
  precedence?: number;
}

export type ValidatorWithPrecedence<Type = unknown, Props extends ComponentProps = ComponentProps> = Validator<
  Type,
  Props
> & {
  precedence: number;
};
