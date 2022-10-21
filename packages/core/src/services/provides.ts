import {FieldInstance, FormInstance} from '../form';
import {InjectionKey} from 'vue';

export const INJECT_FORM = Symbol('form') as InjectionKey<FormInstance>;

export const INJECT_FIELD = Symbol('field') as InjectionKey<FieldInstance>;
