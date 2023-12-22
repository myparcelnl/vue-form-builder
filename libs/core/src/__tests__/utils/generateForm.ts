/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {isOfType} from '@myparcel/ts-utils';
import {defineForm} from '../../utils';
import {type FormConfiguration, type FormValues} from '../../types';

export const generateForm = <Values extends FormValues>(
  config: FormConfiguration<Values> | unknown[] = [],
  name: string | undefined = undefined,
) => {
  if (!isOfType<FormConfiguration<Values>>(config, 'fields')) {
    config = {fields: config};
  }

  const resolvedName = name ?? Math.random().toString(36).substring(7);

  return defineForm<Values>(resolvedName, config);
};
