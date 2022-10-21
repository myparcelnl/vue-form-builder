import {Form, FormConfiguration, FormInstance} from './Form';
import {useFormBuilder} from '../composables';

export const defineForm = <FC extends FormConfiguration>(name: string, config: FC): FormInstance<FC> => {
  const formBuilder = useFormBuilder();

  return formBuilder.register(name, new Form(name, config));
};
