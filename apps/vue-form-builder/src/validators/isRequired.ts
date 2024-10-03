import {type Validator} from '../types/validator.types';
import {type FunctionOr} from '../types/utils.types';
import {type FieldInstance} from '../types/field.types';
import {type ComponentProps} from '../types/component.types';

export const isRequired = <Type = unknown, Props extends ComponentProps = ComponentProps>(
  errorMessage: FunctionOr<string>,
): Validator<Type, Props> => ({
  validate: (field: FieldInstance<Type, Props>, value: Type): boolean => {
    return !(value === null || value === undefined || value === '');
  },
  errorMessage,
});
