import {mount} from '@vue/test-utils';
import {type AnyElementConfiguration} from '../../types/deprecated.types';
import {type FormConfiguration, type FormValues} from '../../types';
import MagicForm from '../../components/MagicForm.vue';
import {generateForm} from './generateForm';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const mountForm = <Values extends FormValues>(
  config: FormConfiguration<FormConfiguration> | AnyElementConfiguration[] = [],
  name: string | undefined = 'form',
) => {
  return mount(MagicForm, {
    props: {
      // @ts-expect-error todo
      form: generateForm<Values>(config, name),
    },
  });
};
