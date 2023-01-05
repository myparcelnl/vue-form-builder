import {AnyElementInstance} from '../types';
import {HookCallback} from '@myparcel-vfb/hook-manager/src';
import {useLifecycleHooks} from './useLifecycleHooks';

type HookObject = Record<string, HookCallback | undefined>;

type UseElementHooks = (
  element: AnyElementInstance,
  initialHooks?: HookObject,
) => {
  hooks: HookObject;
};

export const useElementHooks: UseElementHooks = (element, initialHooks) => {
  const lifecycleHooks = useLifecycleHooks();

  lifecycleHooks.register(element.hooks, element);

  const registeredHooks = element.hooks.getRegisteredHooks();

  return {
    hooks: registeredHooks.reduce(
      (acc, hook) => ({
        ...acc,
        [hook.name]: hook.callback,
      }),
      initialHooks ?? {},
    ),
  };
};
