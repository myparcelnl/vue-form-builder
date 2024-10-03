import {type FieldInstance} from '../types/field.types';
import {useLifecycleHooks} from './useLifecycleHooks';

type UseFieldHooks = (element: FieldInstance) => void;

export const createFieldHooks: UseFieldHooks = (element) => {
  const lifecycleHooks = useLifecycleHooks();

  lifecycleHooks.register(element.hooks, element);
};
