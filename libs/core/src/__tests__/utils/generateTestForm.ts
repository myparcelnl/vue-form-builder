/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {type TestFormConfig} from '../types';
import {createForm} from '../../utils';
import {type FormValues, type CreatedForm} from '../../types';
import {resolveConfigAndFields} from './resolveConfigAndFields';

export const generateTestForm = <Values extends FormValues>(
  configOrFields?: TestFormConfig<Values>,
  name: string | undefined = undefined,
): CreatedForm<Values> => {
  const resolvedName = name ?? Math.random().toString(36).substring(7);

  const {config: resolvedConfig, fields: resolvedFields} = resolveConfigAndFields(configOrFields);

  const form = createForm<Values>(resolvedName, resolvedConfig);

  resolvedFields.forEach((field) => {
    void form.instance.addElement(field);
  });

  return form;
};
