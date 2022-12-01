import {Form, FormConfiguration, FormInstance} from '../form';
import {Ref, reactive, ref} from 'vue';

let forms: Record<string, FormInstance>;
let defaults: Ref<Partial<FormConfiguration>>;

export type FormBuilder = {
  /**
   * All registered forms.
   */
  forms: typeof forms;

  /**
   * Default settings to apply to newly registered forms.
   */
  defaults: Ref<Partial<FormConfiguration>>;

  /**
   * Register a new form. If a form with the same name already exists, it will be overwritten.
   */
  register<FC extends FormConfiguration = FormConfiguration, N extends string = string>(
    name: N,
    config: FC,
  ): FormInstance<FC>;
};

export type UseFormBuilder = () => FormBuilder;

export const useFormBuilder: UseFormBuilder = () => {
  forms ??= reactive({});
  defaults ??= ref({});

  return {
    forms,
    defaults,

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
