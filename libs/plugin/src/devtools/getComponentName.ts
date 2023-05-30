// noinspection SuspiciousTypeOfGuard
import {type PlainElementInstance} from '@myparcel-vfb/core/src';

export const getComponentName = (field: PlainElementInstance): string => {
  return (typeof field.component === 'string' ? field.component : field.component.name) ?? '?';
};
