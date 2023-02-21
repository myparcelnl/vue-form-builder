import {FormInstance} from '../form';
import {INJECT_FORM} from '../services';
import {inject} from 'vue';

export const useForm = (): FormInstance => {
  const form = inject(INJECT_FORM);

  if (!form) {
    throw new Error('No form found.');
  }

  return form;
};
