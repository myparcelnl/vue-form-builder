import {FormInstance} from './form';
import {InjectionKey} from 'vue';

export const INJECT_FORM = Symbol('form') as InjectionKey<FormInstance>;
