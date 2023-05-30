/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {isOfType} from '@myparcel/ts-utils';
import {type AnyElementConfiguration} from '../../types';
import {type FormConfiguration, defineForm} from '../../form';

export const generateForm = (
  config: FormConfiguration | AnyElementConfiguration[] = [],
  name: string | undefined = 'form',
) => {
  if (!isOfType<FormConfiguration>(config, 'fields')) {
    config = {fields: config};
  }

  return defineForm(name, config);
};
