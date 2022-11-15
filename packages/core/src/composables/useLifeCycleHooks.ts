import * as Vue from 'vue';
import {COMPONENT_LIFECYCLE_HOOKS} from '../data/componentLifecycleHooks';
import {ComponentLifecycleHooks} from '../types';
import {HookManagerInstance} from '@myparcel-vfb/hook-manager';

type UseLifeCycleHooks = () => {
  hooks: typeof COMPONENT_LIFECYCLE_HOOKS;
  register(
    hookManager: HookManagerInstance<Partial<ComponentLifecycleHooks>> & Record<string, unknown>,
    args?: unknown,
  ): void;
};

export const useLifeCycleHooks: UseLifeCycleHooks = () => {
  return {
    hooks: COMPONENT_LIFECYCLE_HOOKS,

    register(hookManager, args) {
      if (hookManager.has('onCreated')) {
        void hookManager.execute('onCreated', args);
      }

      COMPONENT_LIFECYCLE_HOOKS.forEach((hook) => {
        if (!hookManager.has(hook)) {
          return;
        }

        if (hook === 'onCreated') {
          return;
        }

        Vue[hook](async () => {
          await hookManager.execute(hook, args);
        });
      });
    },
  };
};
