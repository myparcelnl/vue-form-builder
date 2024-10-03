import {type InjectionKey} from 'vue';
import {type FormInstance, type FieldInstance} from './types';

export const INJECT_FORM = Symbol('form') as InjectionKey<FormInstance>;

export const INJECT_ELEMENT = Symbol('element') as InjectionKey<FieldInstance>;
