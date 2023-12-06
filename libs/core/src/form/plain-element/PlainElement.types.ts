import {type ComponentProps} from '@myparcel-vfb/utils';
import {type HookManagerInstance} from '@myparcel-vfb/hook-manager';
import {type PromiseOr} from '@myparcel/ts-utils';
import {type ToRecord} from '../../types/common.types';
import {type BaseElementConfiguration, type BaseElementInstance, type BaseElementHooks} from '../../types';

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
