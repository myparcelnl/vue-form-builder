import {isUndefined, removePropertiesWith} from '@myparcel/ts-utils';
import {AnyElementInstance} from '../types';
import {HookCallback} from '@myparcel-vfb/hook-manager/src';
import {useLifecycleHooks} from './useLifecycleHooks';

type HookObject = Record<string, HookCallback | undefined>;

type UseElementHooks = (element: AnyElementInstance, initialHooks?: HookObject) => HookObject;

export const createElementHooks: UseElementHooks = (element, initialHooks = {}) => {
  const lifecycleHooks = useLifecycleHooks();

  lifecycleHooks.register(element.hooks, element);

  return removePropertiesWith(initialHooks, isUndefined);
};
