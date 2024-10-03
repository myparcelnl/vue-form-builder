import {type FormConfiguration, type FormInstance, type FormValues} from '../types/form.types';
import {useFormBuilder} from '../composables/useFormBuilder';

export const defineForm = <V extends FormValues = FormValues>(
  name: string,
  config?: FormConfiguration<V>,
): FormInstance<V> => {
  const formBuilder = useFormBuilder();

  return formBuilder.register(name, config);
};
