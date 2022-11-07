/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {FormConfiguration, defineForm} from '../../form';
import {ResolvedElementConfiguration} from '../../types';
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
