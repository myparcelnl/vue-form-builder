import {type ComponentProps, type FunctionOr} from '@myparcel-vfb/utils';
import {type InteractiveElementInstance} from '../interactive-element';
import {type Validator} from './validator.types';

export const isRequired = <Type = unknown, Props extends ComponentProps = ComponentProps>(
  errorMessage: FunctionOr<string>,
): Validator<Type, Props> => ({
  validate: (field: InteractiveElementInstance<Type, Props>, value: Type): boolean => {
    return !(value === null || value === undefined || value === '');
  },
  errorMessage,
});
