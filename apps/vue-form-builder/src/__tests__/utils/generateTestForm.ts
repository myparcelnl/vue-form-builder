import {h} from 'vue';
import {flushPromises, mount, type VueWrapper} from '@vue/test-utils';
import {type TestFormConfig} from '../types';
import {createForm} from '../../utils';
import {type FormValues, type CreatedForm} from '../../types';
import {resolveConfigAndFields} from './resolveConfigAndFields';

type GeneratedTestForm<Values extends FormValues> = CreatedForm<Values> & {wrapper: VueWrapper};

export const generateTestForm = async <Values extends FormValues>(
  configOrFields?: TestFormConfig<Values>,
  name: string | undefined = undefined,
): Promise<GeneratedTestForm<Values>> => {
  const resolvedName = name ?? Math.random().toString(36).substring(7);

  const {config: resolvedConfig, fields: resolvedFields} = resolveConfigAndFields(configOrFields);

  const form = createForm<Values>(resolvedName, resolvedConfig);

  const wrapper = mount(form.Component, {
    slots: {
      default: () => resolvedFields.map((field) => h(field.Component)),
    },
  });

  await flushPromises();

  return {
    ...form,
    wrapper,
  };
};
