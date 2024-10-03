import {ref} from 'vue';
import {createField} from '../../utils/createField';
import {type ModularCreatedField} from '../../types/field.types';
import {mockComponent} from './mockComponent';

export const getCommonFields = (): ModularCreatedField[] => {
  return [
    createField({
      name: 'field1',
      component: mockComponent,
      ref: ref(''),
      label: 'my_label_1',
    }),
    createField({
      name: 'field2',
      component: mockComponent,
      ref: ref(''),
      label: 'my_label_2',
    }),
    createField({
      name: 'field3',
      component: mockComponent,
      ref: ref(''),
      label: 'my_label_3',
    }),
  ];
};
