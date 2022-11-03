import {BaseElementConfiguration, ComponentOrHtmlElement, ElementName, ElementProps} from '../../types';
import {COMPONENT_LIFECYCLE_HOOKS} from '../../data/componentLifecycleHooks';
import {FormInstance} from '../Form.types';
import {HookManager} from '@myparcel/vue-form-builder-hook-manager';
import {PromiseOr} from '@myparcel/vue-form-builder-utils';

export type PlainElementConfiguration<
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  N extends ElementName = ElementName,
> = BaseElementConfiguration<C> & {
  ref?: never;
  name?: N;
};

export const PLAIN_ELEMENT_HOOKS = ['blur', 'click', 'focus', ...COMPONENT_LIFECYCLE_HOOKS] as const;

export type PlainElementHooks<I extends PlainElementInstance = PlainElementInstance> = {
  beforeBlur?(instance: I): PromiseOr<void>;
  blur?(instance: I, event: MouseEvent): PromiseOr<void>;
  afterBlur?(instance: I): PromiseOr<void>;

  /**
   * Executed before focus
   */
  beforeFocus?(instance: I, event: FocusEvent): PromiseOr<void>;

  /**
   * Executed on focus
   */
  focus?(instance: I, event: FocusEvent): PromiseOr<void>;

  /**
   * Executed after focus
   */
  afterFocus?(instance: I, event: FocusEvent): PromiseOr<void>;

  click?(instance: I, event: MouseEvent): PromiseOr<void>;
};

export type PlainElementInstance<
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  N extends ElementName = ElementName,
> = {
  name: N;
  component: C;
  hooks: HookManager<typeof PLAIN_ELEMENT_HOOKS[number], PlainElementHooks>;
  form: FormInstance;
  props?: ElementProps<C>;
};
