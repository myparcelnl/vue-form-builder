import {FormConfiguration, FormInstance} from '../Form.types';
import {Ref, reactive, ref} from 'vue';
import {Form} from '../Form';

let forms: Record<string, FormInstance>;

type UseFormBuilder = <N extends string, FC extends FormConfiguration = FormConfiguration>() => {
  forms: typeof forms;
  defaults: Ref<Partial<FC>>;
  register<F extends FC>(name: N, config: F): FormInstance<F>;
};

export const useFormBuilder: UseFormBuilder = () => {
  forms ??= reactive({});
  const defaults = ref({});

  return {
    /**
     * All registered forms.
     */
    forms,

    /**
     * Default settings to apply to newly registered forms.
     */
    defaults,

    /**
     * Register a new form. If a form with the same name already exists, it will be overwritten.
     */
    register(name, config) {
      const instance = new Form(name, {
        ...defaults.value,
        ...config,
      });

      forms[name] = instance;

      return instance;
    },
  };
};
