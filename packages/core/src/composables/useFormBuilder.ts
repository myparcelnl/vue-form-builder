import {FormConfiguration, FormInstance} from '../form';
import {reactive} from 'vue';

let forms: Record<string, FormInstance>;

export const useFormBuilder = <N extends string, FC extends FormConfiguration = FormConfiguration>() => {
  forms ??= reactive({});
  const defaults = reactive<Partial<FC>>({});

  return {
    forms,
    defaults,
    register<F extends FormInstance<FC>>(name: N, form: F): F {
      forms[name] = {...defaults, ...form};

      return form;
    },
  };
};
