import {CustomInspectorNode} from '@vue/devtools-api';
import {Form} from '../form';
import {LIME_500} from './setupDevtools';
import {createFieldsNodes} from './createFieldsNodes';

export const createFormNode = (name: string, form: Form): CustomInspectorNode => ({
  id: name,
  label: name,
  tags: [
    {
      label: `Fields: ${form.fields.length}`,
      textColor: 0,
      backgroundColor: LIME_500,
    },
  ],
  children: [
    {
      label: 'Hooks',
      id: 'hooks',
      children: [],
    },
    {
      label: 'Fields',
      id: 'fields',
      children: createFieldsNodes(form),
    },
  ],
});
