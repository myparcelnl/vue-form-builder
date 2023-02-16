import {FormInstance, InteractiveElementInstance} from '../form';
import {InjectionKey} from 'vue';

export const INJECT_FORM = Symbol('form') as InjectionKey<FormInstance>;

export const INJECT_ELEMENT = Symbol('element') as InjectionKey<InteractiveElementInstance>;
