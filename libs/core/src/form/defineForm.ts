import {type Component, defineComponent, h, toRaw} from 'vue';
import {useFormBuilder} from '../composables';
import MagicFormNew from '../components/MagicFormNew.vue';
import {type FormConfiguration, type FormInstance, type InstanceFormConfiguration} from './Form.types';

export const defineForm = <FC extends FormConfiguration>(
  name: string,
  config: FC,
): FormInstance<InstanceFormConfiguration<FC>> => {
  const formBuilder = useFormBuilder();

  return formBuilder.register(name, config);
};

export const defineFormNew = <FC extends FormConfiguration>(
  name: string,
  config: Omit<FC, 'fields'>,
): {
  form: FormInstance<InstanceFormConfiguration<FC>>;
  Component: Component;
} => {
  const formBuilder = useFormBuilder();

  const form = formBuilder.register(name, config as FC);

  const Component = defineComponent({
    name,
    setup() {
      return {
        form: toRaw(form),
      };
    },

    render() {
      return h(MagicFormNew, {form: this.form}, this.$slots);
    },
  });

  return {
    form,
    Component,
  };
};
