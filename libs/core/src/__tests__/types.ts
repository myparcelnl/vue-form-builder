import {type FormValues, type FormConfiguration, type FieldConfiguration} from '../types';

export type TestFormConfig<Values extends FormValues = FormValues> =
  | (FormConfiguration<Values> & {fields?: FieldConfiguration[]})
  | FieldConfiguration[];
