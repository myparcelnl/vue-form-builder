import {CYAN_400} from './setupDevtools';
import {CustomInspectorNode} from '@vue/devtools-api';
import {Form} from '../form';

export const createFieldsNodes = (form: Form): CustomInspectorNode[] =>
  form.fields.map((field) => {
    const fieldName = field.name ?? 'anonymous';

    const componentName: string = (typeof field.component === 'string' ? field.component : field.component.name) ?? '–';

    return {
      id: fieldName,
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
