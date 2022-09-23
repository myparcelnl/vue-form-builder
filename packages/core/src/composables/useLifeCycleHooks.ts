import * as Vue from 'vue';
import {COMPONENT_LIFECYCLE_HOOKS, ComponentLifecycleHooks} from '../services/hook-manager/componentHooks';
import {HookManager} from '../services';

export const useLifeCycleHooks = (hookManager: HookManager<ComponentLifecycleHooks>, args?): void => {
  if (hookManager.has('onCreated')) {
    void hookManager.execute('onCreated', args);
  }

  COMPONENT_LIFECYCLE_HOOKS.forEach((hook) => {
    if (!hookManager.has(hook)) {
      return;
    }

    Vue[hook](async () => {
      await hookManager.execute(hook, args);
    });
  });
};
