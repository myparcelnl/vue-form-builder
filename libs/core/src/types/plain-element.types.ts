import {type HookManagerInstance} from '@myparcel-vfb/hook-manager';
import {type PromiseOr} from '@myparcel/ts-utils';
import {type BaseElementHooks, type BaseElementConfiguration, type BaseElementInstance} from './element.types';
import {type ComponentProps} from './component.types';
import {type ToRecord} from './common.types';

export interface PlainElementConfiguration<Props extends ComponentProps = ComponentProps>
  extends BaseElementConfiguration<Props>,
    PlainElementHooks<Props> {
  ref?: never;
}

export interface PlainElementHooks<
  Props extends ComponentProps = ComponentProps,
  I extends PlainElementInstance<Props> = PlainElementInstance<Props>,
> extends BaseElementHooks<I> {
  beforeBlur?(instance: I): PromiseOr<void>;

  blur?(instance: I, event: MouseEvent): PromiseOr<void>;

  afterBlur?(instance: I): PromiseOr<void>;
}

export interface PlainElementInstance<Props extends ComponentProps = ComponentProps>
  extends BaseElementInstance<Props>,
    PlainElementHooks<Props> {
  readonly hooks: HookManagerInstance<ToRecord<PlainElementHooks<Props>>>;
}
