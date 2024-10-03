import {type FormConfiguration, type FormValues} from '../types/form.types';
import {type FieldConfiguration} from '../types/field.types';

export type TestFormConfig<Values extends FormValues = FormValues> =
  | (FormConfiguration<Values> & {fields?: FieldConfiguration[]})
  | FieldConfiguration[];
