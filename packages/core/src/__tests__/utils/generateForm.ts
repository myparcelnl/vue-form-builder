/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {FormConfiguration, ResolvedElementConfiguration} from '@myparcel-vfb/form-builder';
import {defineForm} from '../../defineForm';
import {isOfType} from '@myparcel-vfb/utils';

export const generateForm = (
  config: FormConfiguration | ResolvedElementConfiguration[] = [],
  name: string | undefined = 'form',
) => {
  if (isOfType<FormConfiguration['fields']>(config, 'map')) {
    config = {fields: config};
  }

  return defineForm(name, config);
};
