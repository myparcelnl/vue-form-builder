import {h} from 'vue';
import {type VueWrapper, mount, flushPromises} from '@vue/test-utils';
import {createForm} from '../../utils';
import {type FormConfiguration, type ModularCreatedField, type CreatedForm, type FormValues} from '../../types';
import {getCommonFields} from './getCommonFields';

export const renderTestForm = async <Values extends FormValues>(
  config: FormConfiguration<Values> = {},
  fields: ModularCreatedField[] = getCommonFields(),
): Promise<{
  wrapper: VueWrapper;
  form: CreatedForm<Values>;
}> => {
  const form = createForm<Values>('test', config);
  const wrapper = mount(form.Component, {
    slots: {
      default: fields.map((field) => h(field.Component)),
    },
  });

  await flushPromises();

  return {wrapper, form};
};
