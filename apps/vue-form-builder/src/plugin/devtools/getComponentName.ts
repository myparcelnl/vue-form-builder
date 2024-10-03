import {type FieldInstance} from '../../types/field.types';

export const getComponentName = (field: FieldInstance): string => {
  return (typeof field.component === 'string' ? field.component : field.component.name) ?? '?';
};
