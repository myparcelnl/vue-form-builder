import {h} from 'vue';
import {type VueWrapper, mount, flushPromises} from '@vue/test-utils';
import {generateTestForm, resolveConfigAndFields} from '../utils';
import {type TestFormConfig} from '../types';
import {createField} from '../../utils';
import {type CreatedForm, type FormValues} from '../../types';

export interface CommonFieldValues {
  field1: string;
  field2: string;
  field3: string;
}

export const renderTestForm = async <Values extends FormValues = CommonFieldValues>(
  config?: TestFormConfig<Values>,
  name: string | undefined = undefined,
): Promise<{
  wrapper: VueWrapper;
  form: CreatedForm<Values>;
}> => {
  const {fields, config: resolvedConfig} = resolveConfigAndFields(config);
  const form = await generateTestForm<Values>(resolvedConfig, name);

  const resolvedFields = fields.map(createField);

  const wrapper = mount(form.Component, {
    slots: {
      default: resolvedFields.map((field) => h(field.Component)),
    },
  });

  await flushPromises();

  return {wrapper, form};
};
