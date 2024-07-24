import {flushPromises} from '@vue/test-utils';
import {type TestFormConfig} from '../types';
import {type FormValues, type CreatedForm} from '../../types';
import {generateTestForm} from './generateTestForm';

export const generateTestFormAsync = async <Values extends FormValues>(
  configOrFields?: TestFormConfig<Values>,
  name: string | undefined = undefined,
): Promise<CreatedForm<Values>> => {
  const createdForm = generateTestForm(configOrFields, name);

  await flushPromises();

  return createdForm;
};
