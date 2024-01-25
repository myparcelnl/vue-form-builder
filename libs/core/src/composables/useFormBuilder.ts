import {type Ref, ref, toValue} from 'vue';
import {HookManager} from '@myparcel-vfb/hook-manager';
import {markComponentAsRaw} from '../utils';
import {
  type FormInstance,
  type InstanceFormConfiguration,
  type FormConfiguration,
  type FormValues,
  type FormBuilder,
} from '../types';
import {Form} from '../form';
import {getDefaultFormConfiguration} from '../data';

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
      const instance = new Form(name, mergeDefaults(toValue(defaults), config as FormConfiguration));

      // @ts-expect-error todo
      toValue(forms)[name] = instance;

      void hookManager.execute('afterRegister', instance);

      return instance;
    },

    setDefaults(options) {
      defaults.value = mergeDefaults(toValue(defaults), options);
    },
  };
};

const mergeDefaults = <V extends FormValues, FC extends Partial<FormConfiguration<V>>>(
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
