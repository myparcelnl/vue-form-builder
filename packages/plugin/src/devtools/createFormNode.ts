import {CustomInspectorNode} from '@vue/devtools-api';
import {FormInstance} from '@myparcel-vfb/form-builder';
import {LIME_500} from './types';
import {createFieldsNodes} from './createFieldsNodes';

export const createFormNode = (name: string, form: FormInstance): CustomInspectorNode => ({
  id: `form:${name}`,
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
      id: `form:${name}:hooks`,
      children: [],
    },
    {
      label: 'Fields',
      id: `form:${name}:fields`,
      children: createFieldsNodes(form),
    },
  ],
});
