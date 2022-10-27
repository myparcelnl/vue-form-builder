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
