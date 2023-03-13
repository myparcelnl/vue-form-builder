import {Form, FormConfiguration, FormInstance, InstanceFormConfiguration, getDefaultFormConfiguration} from '../form';
import {Ref, ref} from 'vue';
import {AnyElementConfiguration} from '../types';
import {HookManager} from '@myparcel-vfb/hook-manager/src';
import {markComponentAsRaw} from '../utils';

let forms: Ref<Record<string, FormInstance>>;

let defaults: Ref<InstanceFormConfiguration>;

let hookManager: HookManager;

export type FormBuilder = {
  /**
   * All registered forms.
   */
  forms: typeof forms;

  /**
   * Default settings to apply to newly registered forms.
   */
  defaults: Ref<InstanceFormConfiguration>;

  on(hook: 'beforeRegister', callback: () => void): void;
  on(hook: 'afterRegister', callback: (form: FormInstance) => void): void;

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

const HOOK_REGISTER = 'register';

export const useFormBuilder: UseFormBuilder = () => {
  forms ??= ref({});

  // TODO: infinitely deep type error
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  defaults ??= ref(getDefaultFormConfiguration());

  hookManager ??= new HookManager({
    hookNames: [HOOK_REGISTER] as const,
  });

  return {
    defaults,
    forms,

    on(hook, callback) {
      hookManager.register(hook, callback);
    },

    register(name, config) {
      void hookManager.execute('beforeRegister');
      const instance = new Form(name, mergeDefaults(defaults.value, config));

      forms.value[name] = instance;

      void hookManager.execute('afterRegister', instance);

      return instance;
    },

    setDefaults(options) {
      defaults.value = mergeDefaults(defaults.value, options);
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
