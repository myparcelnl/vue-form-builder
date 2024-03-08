import {type InjectionKey} from 'vue';
import {type AnyElementInstance} from './types/deprecated.types';
import {type FormInstance} from './types';

export const INJECT_FORM = Symbol('form') as InjectionKey<FormInstance>;

export const INJECT_ELEMENT = Symbol('element') as InjectionKey<AnyElementInstance>;
