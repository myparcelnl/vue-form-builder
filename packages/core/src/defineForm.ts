import {FormConfiguration, FormInstance, useFormBuilder} from '@myparcel-vfb/form-builder';

export const defineForm = <FC extends FormConfiguration>(name: string, config: FC): FormInstance<FC> => {
  const formBuilder = useFormBuilder();

  return formBuilder.register(name, config);
};
