import {type Component} from 'vue';
import {type PromiseOr} from '@myparcel/ts-utils';
import {type BaseElementInstance} from './element.types';

export interface ComponentLifecycleHooks<I extends BaseElementInstance = BaseElementInstance> {
  onActivated?(instance: I): PromiseOr<void>;

  onBeforeMount?(instance: I): PromiseOr<void>;

  onBeforeUnmount?(instance: I): PromiseOr<void>;

  onBeforeUpdate?(instance: I): PromiseOr<void>;

  onCreated?(instance: I): PromiseOr<void>;

  onDeactivated?(instance: I): PromiseOr<void>;

  onMounted?(instance: I): PromiseOr<void>;

  onUnmounted?(instance: I): PromiseOr<void>;

  onUpdated?(instance: I): PromiseOr<void>;
}

export type ComponentProps = any;

export type ComponentOrHtmlElement<Props extends ComponentProps = ComponentProps> = string | Component<Props>;
