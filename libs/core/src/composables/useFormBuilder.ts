import {Form, FormConfiguration, FormInstance, InstanceFormConfiguration, getDefaultFormConfiguration} from '../form';
import {Ref, ref} from 'vue';
import {AnyElementConfiguration} from '../types';
import {markComponentAsRaw} from '../utils';

let forms: Ref<Record<string, FormInstance>>;

let defaults: Ref<InstanceFormConfiguration>;

export type FormBuilder = {
  /**
   * All registered forms.
   */
  forms: typeof forms;

  /**
   * Default settings to apply to newly registered forms.
   */
  defaults: Ref<InstanceFormConfiguration>;

  /**
   * Register a new form. If a form with the same name already exists, it will be overwritten.
   */
  register<FC extends FormConfiguration = FormConfiguration, N extends string = string>(
    name: N,
    config: FC,
  ): FormInstance<InstanceFormConfiguration<FC>>;

  setDefaults(options: Partial<FormConfiguration>): void;
};

export type UseFormBuilder = () => FormBuilder;

export const useFormBuilder: UseFormBuilder = () => {
  forms ??= ref({});

  // TODO: infinitely deep type error
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  defaults ??= ref(getDefaultFormConfiguration());

  return {
    defaults,
    forms,

    setDefaults(options) {
      defaults.value = mergeDefaults(defaults.value, options);
    },

    register(name, config) {
      const instance = new Form(name, mergeDefaults(defaults.value, config));

      forms.value[name] = instance;

      return instance;
    },
  };
};

const mergeDefaults = <FC extends Partial<FormConfiguration>>(
  defaults: InstanceFormConfiguration,
  config: FC,
): InstanceFormConfiguration<FC & {fields: AnyElementConfiguration[]}> => {
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
