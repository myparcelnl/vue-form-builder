import {type InjectionKey} from 'vue';
import {type FormInstance} from './types/form.types';
import {type FieldInstance} from './types/field.types';

export const INJECT_FORM = Symbol('form') as InjectionKey<FormInstance>;

export const INJECT_ELEMENT = Symbol('element') as InjectionKey<FieldInstance>;
