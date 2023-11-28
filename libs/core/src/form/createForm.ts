import {type Component, h, markRaw} from 'vue';
import MagicForm from '../components/MagicForm.vue';
import {defineForm} from './defineForm';
import {type FormConfiguration, type FormInstance, type FormValues} from './Form.types';

export interface CreatedForm<V extends FormValues> {
  Component: Component;
  instance: FormInstance<V>;
}

export const createForm = <V extends FormValues = FormValues>(
  name: string,
  config: Omit<FormConfiguration<V>, 'fields'>,
): CreatedForm<V> => {
  const form = defineForm(name, config as FormConfiguration<V>);

  return {
    Component: markRaw((_, ctx) => h<{form: FormInstance<V>}>(MagicForm, {form}, ctx.slots)),
    instance: form,
  };
};
