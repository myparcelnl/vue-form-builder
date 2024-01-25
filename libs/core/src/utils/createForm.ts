import {h, markRaw} from 'vue';
import {type FormInstance, type FormConfiguration, type FormValues, type CreatedForm} from '../types';
import MagicForm from '../components/MagicForm.vue';
import {defineForm} from './defineForm';

export const createForm = <V extends FormValues = FormValues>(
  name: string,
  config: Omit<FormConfiguration<V>, 'fields'>,
): CreatedForm<V> => {
  const form = defineForm(name, config as FormConfiguration<V>);

  return {
    Component: markRaw((_, ctx) => h<{form: FormInstance<V>}>(MagicForm, {...ctx.attrs, form}, ctx.slots)),
    instance: form,
  };
};
