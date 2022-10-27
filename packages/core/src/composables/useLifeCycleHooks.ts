import * as Vue from 'vue';
import {HookManager, HookManagerInput} from '@myparcel/vue-form-builder-hook-manager';
import {PromiseOr} from '@myparcel/vue-form-builder-utils';

export const COMPONENT_LIFECYCLE_HOOKS = [
  'onCreated',
  'onActivated',
  'onBeforeMount',
  'onBeforeUnmount',
  'onBeforeUpdate',
  'onDeactivated',
  'onMounted',
  'onUnmounted',
  'onUpdated',
] as const;

export type ComponentLifecycleHooks<I = unknown> = {
  [k in typeof COMPONENT_LIFECYCLE_HOOKS[number]]?: (instance: I) => PromiseOr<void>;
};

export const useLifeCycleHooks = (
  hookManager: HookManager<HookManagerInput<typeof COMPONENT_LIFECYCLE_HOOKS, ComponentLifecycleHooks>>,
  args?: unknown,
): void => {
  if (hookManager.has('onCreated')) {
    void hookManager.execute('onCreated', args);
  }

  COMPONENT_LIFECYCLE_HOOKS.forEach((hook) => {
    if (!hookManager.has(hook)) {
      return;
    }

    if (hook === 'onCreated') return;

    Vue[hook](async () => {
      await hookManager.execute(hook, args);
    });
  });
};
