import {useFormBuilder} from '../composables';
import {type FormConfiguration, type FormInstance, type FormValues} from './Form.types';

export const defineForm = <V extends FormValues = FormValues>(
  name: string,
  config: FormConfiguration<V>,
): FormInstance<V> => {
  const formBuilder = useFormBuilder();

  return formBuilder.register(name, config);
};
