// noinspection SuspiciousTypeOfGuard
import {PlainElementInstance} from '@myparcel-vfb/core';
import {UnwrapNestedRefs} from 'vue';

export const getComponentName = (field: UnwrapNestedRefs<PlainElementInstance>): string => {
  return (typeof field.component === 'string' ? field.component : field.component.name) ?? '?';
};
