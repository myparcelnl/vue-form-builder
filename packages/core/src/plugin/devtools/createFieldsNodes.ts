import {CYAN_400} from './types';
import {CustomInspectorNode} from '@vue/devtools-api';
import {FormInstance} from '../../form';

export const createFieldsNodes = (form: FormInstance): CustomInspectorNode[] => {
  let anonymousIndex = 0;

  return form.fields.map((field) => {
    const fieldName = field.name ?? `anonymous:${anonymousIndex++}`;

    const componentName: string = (typeof field.component === 'string' ? field.component : field.component.name) ?? '?';

    return {
      id: `field:${fieldName}`,
      label: fieldName,
      tags: [
        {
          label: componentName,
          tooltip: 'Type',
          textColor: 0,
          backgroundColor: CYAN_400,
        },
      ],
    };
  });
};
