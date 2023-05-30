import {mount} from '@vue/test-utils';
import {type AnyElementConfiguration} from '../../types';
import {type FormConfiguration} from '../../form';
import {MagicForm} from '../../components';
import {generateForm} from './generateForm';

export const mountForm = (
  config: FormConfiguration | AnyElementConfiguration[] = [],
  name: string | undefined = 'form',
) => {
  return mount(MagicForm, {props: {form: generateForm(config, name)}});
};
