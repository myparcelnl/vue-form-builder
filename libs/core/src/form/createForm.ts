import {type Component, h, reactive, type UnwrapNestedRefs} from 'vue';
import {useFormBuilder} from '../composables';
import MagicForm from '../components/MagicForm.vue';
import {type FormConfiguration, type FormInstance, type InstanceFormConfiguration} from './Form.types';

export interface CreatedForm<FC extends FormConfiguration> {
  Component: Component;
  instance: UnwrapNestedRefs<FormInstance<InstanceFormConfiguration<FC>>>;
}

export const createForm = <FC extends FormConfiguration>(name: string, config: Omit<FC, 'fields'>): CreatedForm<FC> => {
  const formBuilder = useFormBuilder();
  const form = formBuilder.register(name, config as FC);

  return {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    Component: (_, ctx) => h(MagicForm, {form}, ctx.slots),
    instance: reactive(form),
  };
};