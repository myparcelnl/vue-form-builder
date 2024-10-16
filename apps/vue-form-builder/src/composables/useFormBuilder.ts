import {type Ref, ref, toValue} from 'vue';
import {normalizeFormConfiguration} from '../utils/normalizeFormConfiguration';
import {getDefaultFormConfiguration} from '../utils/getDefaultFormConfiguration';
import {type FormConfiguration, type FormInstance, type InstanceFormConfiguration} from '../types/form.types';
import {type FormBuilder} from '../types/form-builder.types';
import {HookManager} from '../hooks/HookManager';
import {Form} from '../form/Form';

let forms: Ref<Record<string, FormInstance>>;

let defaults: Ref<InstanceFormConfiguration>;

let hookManager: HookManager;

const HOOK_REGISTER = 'register';

export const useFormBuilder = (): FormBuilder => {
  forms ??= ref({});

  // TODO: infinitely deep type error
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  defaults ??= ref(getDefaultFormConfiguration());

  hookManager ??= new HookManager({
    hookNames: [HOOK_REGISTER] as const,
  });

  return {
    forms,
    defaults,

    on(hook, callback) {
      hookManager.register(hook, callback);
    },

    getForm(name) {
      return toValue(forms)[name];
    },

    // @ts-expect-error todo
    register(name, config) {
      void hookManager.execute('beforeRegister');
      const instance = new Form(name, normalizeFormConfiguration(toValue(defaults), {...config} as FormConfiguration));

      // @ts-expect-error todo
      toValue(forms)[name] = instance;

      void hookManager.execute('afterRegister', instance);

      return instance;
    },

    setDefaults(options) {
      defaults.value = normalizeFormConfiguration(toValue(defaults), options);
    },
  };
};
