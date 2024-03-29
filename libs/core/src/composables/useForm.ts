import {inject} from 'vue';
import {type FormInstance, type FormValues} from '../types';
import {INJECT_FORM} from '../symbols';

export const useForm = <V extends FormValues>(): FormInstance<V> => {
  const form = inject(INJECT_FORM);

  if (!form) {
    throw new Error('No form found.');
  }

  return form;
};
