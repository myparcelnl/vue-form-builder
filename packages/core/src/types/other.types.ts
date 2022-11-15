import {PromiseOr} from '@myparcel/ts-utils';

export type ComponentLifecycleHooks<I = unknown> = {
  onActivated: (instance: I) => PromiseOr<void>;
  onBeforeMount: (instance: I) => PromiseOr<void>;
  onBeforeUnmount: (instance: I) => PromiseOr<void>;
  onBeforeUpdate: (instance: I) => PromiseOr<void>;
  onCreated: (instance: I) => PromiseOr<void>;
  onDeactivated: (instance: I) => PromiseOr<void>;
  onMounted: (instance: I) => PromiseOr<void>;
  onUnmounted: (instance: I) => PromiseOr<void>;
  onUpdated: (instance: I) => PromiseOr<void>;
};
