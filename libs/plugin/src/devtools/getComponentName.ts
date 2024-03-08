// noinspection SuspiciousTypeOfGuard
import {type BaseFieldInstance} from '@myparcel-vfb/core';

export const getComponentName = (field: BaseFieldInstance): string => {
  return (typeof field.component === 'string' ? field.component : field.component.name) ?? '?';
};
