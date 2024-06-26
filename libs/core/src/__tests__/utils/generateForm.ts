/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {createForm} from '../../utils';
import {type FormConfiguration, type FormValues, type CreatedForm} from '../../types';

export const generateForm = <Values extends FormValues>(
  config: FormConfiguration<Values>,
  name: string | undefined = undefined,
): CreatedForm<Values> => {
  const resolvedName = name ?? Math.random().toString(36).substring(7);

  return createForm<Values>(resolvedName, config);
};
