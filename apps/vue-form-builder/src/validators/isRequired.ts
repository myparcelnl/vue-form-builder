import {type Validator, type ComponentProps, type FunctionOr, type FieldInstance} from '../types';

export const isRequired = <Type = unknown, Props extends ComponentProps = ComponentProps>(
  errorMessage: FunctionOr<string>,
): Validator<Type, Props> => ({
  validate: (field: FieldInstance<Type, Props>, value: Type): boolean => {
    return !(value === null || value === undefined || value === '');
  },
  errorMessage,
});
