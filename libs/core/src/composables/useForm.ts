import {inject} from 'vue';
import {INJECT_FORM} from '../services';
import {type FormInstance} from '../form';

export const useForm = (): FormInstance => {
  const form = inject(INJECT_FORM);

  if (!form) {
    throw new Error('No form found.');
  }

  return form;
};
