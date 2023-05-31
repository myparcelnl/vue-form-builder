import * as Vue from 'vue';
import {type HookManagerInstance} from '@myparcel-vfb/hook-manager';
import {type ComponentLifecycleHooks} from '../types';
import {COMPONENT_LIFECYCLE_HOOKS} from '../data';

type UseLifeCycleHooks = () => {
  hooks: typeof COMPONENT_LIFECYCLE_HOOKS;
  register(
    hookManager: HookManagerInstance<Partial<ComponentLifecycleHooks>> & Record<string, unknown>,
    ...args: unknown[]
  ): void;
};

const HOOK_ON_CREATED = 'onCreated';

export const useLifecycleHooks: UseLifeCycleHooks = () => {
  return {
    hooks: COMPONENT_LIFECYCLE_HOOKS,

    register(hookManager, ...args) {
      if (hookManager.has(HOOK_ON_CREATED)) {
        void hookManager.execute(HOOK_ON_CREATED, ...args);
      }

      hookManager
        .getRegisteredHooks()
        .filter(
          (hook) =>
            COMPONENT_LIFECYCLE_HOOKS.includes(hook.name as keyof ComponentLifecycleHooks) &&
            hook.name !== HOOK_ON_CREATED,
        )
        .forEach((hook) => {
          // @ts-expect-error hook.name exists on Vue
          Vue[hook.name](async () => {
            await hookManager.execute(hook.name, ...args);
          });
        });
    },
  };
};
