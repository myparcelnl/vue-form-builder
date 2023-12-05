import {inject} from 'vue';
import {INJECT_FORM} from '../symbols';
import {type FormInstance, type FormValues} from '../form';

export const useForm = <V extends FormValues>(): FormInstance<V> => {
  const form = inject(INJECT_FORM);

  if (!form) {
    throw new Error('No form found.');
  }

  return form;
};
