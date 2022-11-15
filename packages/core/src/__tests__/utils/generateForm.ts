/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {FormConfiguration, defineForm} from '../../form';
import {AnyElementConfiguration} from '../../types';
import {isOfType} from '@myparcel/ts-utils';

export const generateForm = (
  config: FormConfiguration | AnyElementConfiguration[] = [],
  name: string | undefined = 'form',
) => {
  if (!isOfType<FormConfiguration>(config, 'fields')) {
    config = {fields: config};
  }

  return defineForm(name, config);
};
