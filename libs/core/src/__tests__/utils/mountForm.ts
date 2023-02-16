import {FormConfiguration} from '../../form';
import {AnyElementConfiguration} from '../../types';
import {mount} from '@vue/test-utils';
import {MagicForm} from '../../components';
import {generateForm} from './generateForm';

export const mountForm = (
  config: FormConfiguration | AnyElementConfiguration[] = [],
  name: string | undefined = 'form',
) => {
  return mount(MagicForm, {props: {form: generateForm(config, name)}});
};
