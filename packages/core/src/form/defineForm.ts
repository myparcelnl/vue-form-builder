import {ComponentOrHtmlElement, FieldName} from '../types';
import {FormConfiguration, FormInstance} from './Form.types';
import {Form} from './Form';
import {useFormBuilder} from '../composables';

export const defineForm = <FC extends FormConfiguration>(name: string, config: FC): FormInstance<FC> => {
  const formBuilder = useFormBuilder();
  const form = new Form<ComponentOrHtmlElement, FieldName, unknown, FC>(name, config);

  return formBuilder.register(name, form);
};
