import {type FormInstance, type FormConfiguration, type FormValues} from '../types';
import {useFormBuilder} from '../composables';

export const defineForm = <V extends FormValues = FormValues>(
  name: string,
  config: FormConfiguration<V>,
): FormInstance<V> => {
  const formBuilder = useFormBuilder();

  return formBuilder.register(name, config);
};
