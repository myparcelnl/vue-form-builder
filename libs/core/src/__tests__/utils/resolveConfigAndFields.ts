import {type TestFormConfig} from '../types';
import {type FormConfiguration, type FieldConfiguration, type FormValues} from '../../types';

type ResolvedConfigAndFields<Values extends FormValues> = {
  config: FormConfiguration<Values>;
  fields: FieldConfiguration[];
};

export const resolveConfigAndFields = <Values extends FormValues>(
  configOrFields?: TestFormConfig<Values>,
): ResolvedConfigAndFields<Values> => {
  const resolvedConfig: FormConfiguration<Values> = {};
  const resolvedFields: FieldConfiguration[] = [];

  if (Array.isArray(configOrFields)) {
    resolvedFields.push(...configOrFields);
  } else if (configOrFields) {
    const {fields, ...restConfig} = configOrFields ?? {};

    resolvedFields.push(...(fields ?? []));

    Object.assign(resolvedConfig, restConfig);
  }

  return {
    config: resolvedConfig,
    fields: resolvedFields,
  };
};
