import {type HookCallback} from '@myparcel-vfb/hook-manager';
import {isUndefined, removePropertiesWith} from '@myparcel/ts-utils';
import {type AnyElementInstance} from '../types';
import {useLifecycleHooks} from './useLifecycleHooks';

type HookObject = Record<string, HookCallback | undefined>;

type UseElementHooks = (element: AnyElementInstance, initialHooks?: HookObject) => HookObject;

export const createElementHooks: UseElementHooks = (element, initialHooks = {}) => {
  const lifecycleHooks = useLifecycleHooks();

  lifecycleHooks.register(element.hooks, element);

  return removePropertiesWith(initialHooks, isUndefined);
};
