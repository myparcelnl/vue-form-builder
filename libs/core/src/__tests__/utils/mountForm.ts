import {mount} from '@vue/test-utils';
import {type FormConfiguration, type FormValues, type FieldConfiguration} from '../../types';
import MagicForm from '../../components/MagicForm.vue';
import {generateForm} from './generateForm';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const mountForm = <Values extends FormValues>(
  config: FormConfiguration<FormConfiguration> | FieldConfiguration[] = [],
  name: string | undefined = 'form',
) => {
  const resolvedFields = Array.isArray(config) ? config : [];

  return mount(MagicForm, {
    props: {
      // @ts-expect-error todo
      form: generateForm<Values>(config, name),
    },
    slots: {},
  });
};
