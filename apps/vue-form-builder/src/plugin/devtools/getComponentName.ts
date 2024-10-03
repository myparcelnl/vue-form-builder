// noinspection SuspiciousTypeOfGuard

import {type FieldInstance} from '../../types';

export const getComponentName = (field: FieldInstance): string => {
  return (typeof field.component === 'string' ? field.component : field.component.name) ?? '?';
};
