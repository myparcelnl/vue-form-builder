import {useFormBuilder} from '../composables';
import {type FormConfiguration, type FormInstance, type InstanceFormConfiguration} from './Form.types';

export const defineForm = <FC extends FormConfiguration>(
  name: string,
  config: FC,
): FormInstance<InstanceFormConfiguration<FC>> => {
  const formBuilder = useFormBuilder();

  return formBuilder.register(name, config);
};
