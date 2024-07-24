import {mount} from '@vue/test-utils';
import {type FormConfiguration, type FormValues, type FieldConfiguration} from '../../types';
import MagicForm from '../../components/MagicForm.vue';
import {generateTestForm} from './generateTestForm';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const mountForm = <Values extends FormValues>(
  config: FormConfiguration<FormConfiguration> | FieldConfiguration[] = [],
  name: string | undefined = 'form',
) => {
  const resolvedFields = Array.isArray(config) ? config : [];

  return mount(MagicForm, {
    props: {
      // @ts-expect-error todo
      form: generateTestForm<Values>(config, name),
    },
    slots: {
      default: resolvedFields.map((field) => ({
        template: `<div><component :is="field.component"/></div>`,
      })),
    },
  });
};
