import {BaseElementConfiguration, ComponentHooks, ComponentOrHtmlElement, ElementName, ElementProps} from '../../types';
import {Ref, VNode} from 'vue';
import {COMPONENT_LIFECYCLE_HOOKS} from '../../data/componentLifecycleHooks';
import {FormInstance} from '../Form.types';
import {HookManagerInstance} from '@myparcel-vfb/hook-manager';
import {PromiseOr} from '@myparcel/ts-utils';

export type PlainElementConfiguration<
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  N extends ElementName = ElementName,
> = BaseElementConfiguration<C> & {
  ref?: never;
  name?: N;
} & PlainElementHooks<C, N>;

export const PLAIN_ELEMENT_HOOKS = ['blur', 'click', 'focus', ...COMPONENT_LIFECYCLE_HOOKS] as const;

export type PlainElementHooks<
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  N extends ElementName = ElementName,
  I = BasePlainElementInstance<C, N>,
> = Partial<ComponentHooks<C, I>> & {
  beforeBlur?(instance: I): PromiseOr<void>;
  blur?(instance: I, event: MouseEvent): PromiseOr<void>;
  afterBlur?(instance: I): PromiseOr<void>;

  beforeFocus?(instance: I, event: FocusEvent): PromiseOr<void>;
  focus?(instance: I, event: FocusEvent): PromiseOr<void>;
  afterFocus?(instance: I, event: FocusEvent): PromiseOr<void>;

  beforeClick?(instance: I): PromiseOr<void>;
  click?(instance: I, event: MouseEvent): PromiseOr<void>;
  afterClick?(instance: I): PromiseOr<void>;

  visibleCb?(field: I): PromiseOr<boolean>;
};

export type BasePlainElementInstance<
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  N extends ElementName = ElementName,
> = {
  readonly name: N;
  readonly label?: string;
  readonly component: C;

  readonly hooks: HookManagerInstance<PlainElementHooks<C, N>>;
  readonly form: FormInstance;
  readonly props: ElementProps<C>;
  readonly slots?: Record<string, VNode | VNode[] | string>;

  readonly isVisible: Ref<boolean>;
  readonly teleportSelector?: string;

  readonly formattedErrors: () => string[];

  /**
   * Resets the field.
   */
  readonly reset: () => PromiseOr<void>;
};

export type PlainElementInstance<
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  N extends ElementName = ElementName,
> = BasePlainElementInstance<C, N> & PlainElementHooks<C, N>;
