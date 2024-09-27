import {type TestFormConfig} from '../types';
import {createField} from '../../utils';
import {type FormConfiguration, type FormValues, type ModularCreatedField} from '../../types';

type ResolvedConfigAndFields<Values extends FormValues> = {
  config: FormConfiguration<Values>;
  fields: ModularCreatedField[];
};

export const resolveConfigAndFields = <Values extends FormValues>(
  configOrFields?: TestFormConfig<Values>,
): ResolvedConfigAndFields<Values> => {
  const resolvedConfig: FormConfiguration<Values> = {};
  const resolvedFields: ModularCreatedField[] = [];

  if (Array.isArray(configOrFields)) {
    resolvedFields.push(...configOrFields.map(createField));
  } else if (configOrFields) {
    const {fields, ...restConfig} = configOrFields ?? {};

    resolvedFields.push(...(fields ?? []).map(createField));

    Object.assign(resolvedConfig, restConfig);
  }

  return {
    config: resolvedConfig,
    fields: resolvedFields,
  };
};
