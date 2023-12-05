import {type InjectionKey} from 'vue';
import {type AnyElementInstance} from './types';
import {type FormInstance} from './form';

export const INJECT_FORM = Symbol('form') as InjectionKey<FormInstance>;

export const INJECT_ELEMENT = Symbol('element') as InjectionKey<AnyElementInstance>;
