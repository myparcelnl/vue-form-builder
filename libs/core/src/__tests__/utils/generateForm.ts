/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {isOfType} from '@myparcel/ts-utils';
import {defineForm} from '../../utils';
import {type FormConfiguration} from '../../types';

export const generateForm = (config: FormConfiguration | unknown[] = [], name: string | undefined = 'form') => {
  if (!isOfType<FormConfiguration>(config, 'fields')) {
    config = {fields: config};
  }

  return defineForm(name, config);
};
