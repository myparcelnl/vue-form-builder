import {inject} from 'vue';
import {type FormInstance} from '../form';
import {INJECT_FORM} from '../data';

export const useForm = (): FormInstance => {
  const form = inject(INJECT_FORM);

  if (!form) {
    throw new Error('No form found.');
  }

  return form;
};
