import {type FormConfiguration, type FormValues, type InstanceFormConfiguration} from '../types/form.types';
import {markComponentAsRaw} from './markComponentAsRaw';

export const normalizeFormConfiguration = <V extends FormValues, FC extends Partial<FormConfiguration<V>>>(
  defaults: InstanceFormConfiguration<V>,
  config: FC,
): InstanceFormConfiguration<V> => {
  return {
    ...defaults,
    ...config,
    fields: [...(defaults.fields ?? []), ...(config.fields ?? [])],
    form: {
      ...defaults.form,
      ...config.form,
      wrapper: markComponentAsRaw(config.form?.wrapper ?? defaults.form?.wrapper),
      attributes: {
        ...defaults.form.attributes,
        ...config.form?.attributes,
      },
    },
    fieldDefaults: {
      ...defaults.fieldDefaults,
      ...config.fieldDefaults,
      wrapper: markComponentAsRaw(config.fieldDefaults?.wrapper ?? defaults.fieldDefaults?.wrapper),
      attributes: {
        ...defaults.fieldDefaults.attributes,
        ...config.fieldDefaults?.attributes,
      },
    },
  };
};
