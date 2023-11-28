import {inject} from 'vue';
import {type FormInstance, type FormValues} from '../form';
import {INJECT_FORM} from '../data';

export const useForm = <V extends FormValues>(): FormInstance<V> => {
  const form = inject(INJECT_FORM);

  if (!form) {
    throw new Error('No form found.');
  }

  return form;
};
