import {BaseElementConfiguration, ComponentOrHtmlElement, FieldName, Props} from '../../types';
import {FormConfiguration, FormInstance} from '../Form.types';
import {HookManager} from '@myparcel/vue-form-builder-hook-manager';
import {PromiseOr} from '@myparcel/vue-form-builder-utils';

export type PlainElementConfiguration<C extends ComponentOrHtmlElement = ComponentOrHtmlElement> =
  BaseElementConfiguration<C> & {
    name?: never;
    ref?: never;
  };

export type PlainElementHooks<I extends PlainElementInstance = PlainElementInstance> = {
  blur(instance: I, event: MouseEvent): PromiseOr<void>;
  click(instance: I, event: MouseEvent): PromiseOr<void>;
  focus(instance: I, event: FocusEvent): PromiseOr<void>;
};

export type PlainElementInstance<
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  N extends FieldName = FieldName,
> = {
  name: N;
  component: C;
  hooks: HookManager;
  form: FormInstance<FormConfiguration, C, N, never>;
  props: Props<C>;
};
