// noinspection SuspiciousTypeOfGuard
import {type BaseElementInstance} from '@myparcel-vfb/core';

export const getComponentName = (field: BaseElementInstance): string => {
  return (typeof field.component === 'string' ? field.component : field.component.name) ?? '?';
};
