import {type Ref} from 'vue';
import {type InstanceFormConfiguration, type FormInstance, type FormValues, type FormConfiguration} from './form.types';

export type FormBuilder = {
  /**
   * All registered forms.
   */
  forms: Ref<Record<string, FormInstance>>;

  /**
   * Default settings to apply to newly registered forms.
   */
  defaults: Ref<InstanceFormConfiguration>;

  on(hook: 'beforeRegister', callback: () => void): void;
  on(hook: 'afterRegister', callback: (form: FormInstance) => void): void;

  /**
   * Register a new form. If a form with the same name already exists, it will be overwritten.
   */
  register<V extends FormValues = FormValues, N extends string = string>(
    name: N,
    config: FormConfiguration<V>,
  ): FormInstance<V>;

  /**
   * Retrieve a previously registered form.
   */
  getForm<N extends string>(name: N): FormInstance;

  /**
   * Set default settings to apply to newly registered forms.
   */
  setDefaults(options: Partial<FormConfiguration>): void;
};
