import {type FunctionOr} from '@myparcel-vfb/utils';
import {type Validator, type InteractiveElementInstance, type ComponentProps} from '../types';

export const isRequired = <Type = unknown, Props extends ComponentProps = ComponentProps>(
  errorMessage: FunctionOr<string>,
): Validator<Type, Props> => ({
  validate: (field: InteractiveElementInstance<Type, Props>, value: Type): boolean => {
    return !(value === null || value === undefined || value === '');
  },
  errorMessage,
});
