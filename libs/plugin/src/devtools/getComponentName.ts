// noinspection SuspiciousTypeOfGuard
import {PlainElementInstance} from '@myparcel-vfb/core';

export const getComponentName = (field: PlainElementInstance): string => {
  return (typeof field.component === 'string' ? field.component : field.component.name) ?? '?';
};
