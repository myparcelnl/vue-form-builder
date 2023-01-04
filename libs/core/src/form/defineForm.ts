import {FormConfiguration, FormInstance, InstanceFormConfiguration} from './Form.types';
import {useFormBuilder} from '../composables';

export const defineForm = <FC extends FormConfiguration>(
  name: string,
  config: FC,
): FormInstance<InstanceFormConfiguration<FC>> => {
  const formBuilder = useFormBuilder();

  return formBuilder.register(name, config);
};
