import {CYAN_400} from './types';
import {CustomInspectorNode} from '@vue/devtools-api';
import {FormInstance} from '@myparcel-vfb/core/src';
import {UnwrapNestedRefs} from 'vue';
import {getComponentName} from './getComponentName';

export const createFieldsNodes = (form: UnwrapNestedRefs<FormInstance>): CustomInspectorNode[] => {
  let anonymousIndex = 0;

  return form.fields.map((field) => {
    const fieldName = field.name ?? `anonymous#${anonymousIndex++}`;

    return {
      id: `form:${form.name}|field:${fieldName}`,
      label: fieldName,
      tags: [
        {
          label: getComponentName(field),
          tooltip: 'Type',
          textColor: 0,
          backgroundColor: CYAN_400,
        },
      ],
    };
  });
};
