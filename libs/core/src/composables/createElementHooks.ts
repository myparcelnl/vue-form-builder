import {type AnyElementInstance} from '../types';
import {useLifecycleHooks} from './useLifecycleHooks';

type UseElementHooks = (element: AnyElementInstance) => void;

export const createElementHooks: UseElementHooks = (element) => {
  const lifecycleHooks = useLifecycleHooks();

  lifecycleHooks.register(element.hooks, element);
};
