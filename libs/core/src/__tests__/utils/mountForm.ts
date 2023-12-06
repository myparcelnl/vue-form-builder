import {mount} from '@vue/test-utils';
import {type AnyElementConfiguration, type FormConfiguration} from '../../types';
import MagicForm from '../../components/MagicForm.vue';
import {generateForm} from './generateForm';

export const mountForm = (
  config: FormConfiguration | AnyElementConfiguration[] = [],
  name: string | undefined = 'form',
) => {
  return mount(MagicForm, {props: {form: generateForm(config, name)}});
};
