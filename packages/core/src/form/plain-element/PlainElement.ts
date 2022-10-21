/* eslint-disable no-invalid-this */
import {COMPONENT_LIFECYCLE_HOOKS, ComponentLifecycleHooks} from '../../services/hook-manager/componentHooks';
import {Component, ConcreteComponent, markRaw} from 'vue';
import {PromiseOr, isOfType} from '@myparcel/vue-form-builder-utils';
import {HookManager, InputHookConfiguration} from '../../services';
import {FormInstance} from '../Form';
import {MagicFormProps} from '../../types';

const AVAILABLE_HOOKS = ['click', 'focus', ...COMPONENT_LIFECYCLE_HOOKS] as const;

type Hooks<I> = {
  click(instance: I, event: MouseEvent): PromiseOr<void>;
  focus(instance: I, event: FocusEvent): PromiseOr<void>;
};

export const HOOKS = ['update', 'blur', 'focus', 'click'] as const;

type ElementHookName = typeof HOOKS[number];

export type ComponentOrHtmlElement = string | Component;

export type ElementHooks<I> = {
  [K in ElementHookName]: (element: I, ...args: never[]) => PromiseOr<void>;
} & ComponentLifecycleHooks<I>;

export type ElementDefinitionBase<C extends ComponentOrHtmlElement = ComponentOrHtmlElement> = {
  component: C;
  hookNames?: string[];
  props?: C extends Component ? MagicFormProps<C> : never;
};

export type ElementConfig<
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  I = unknown,
> = ElementDefinitionBase<C> & Partial<ElementHooks<I>>;

type PlainElementConfig<
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  AHC extends InputHookConfiguration = InputHookConfiguration,
  HC extends InputHookConfiguration = Hooks<PlainElement<C, AHC>> & AHC,
> = ElementConfig<C, PlainElement<C, AHC, HC>> & Partial<HC>;

export class PlainElement<
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  AHC extends InputHookConfiguration = InputHookConfiguration,
  HC extends InputHookConfiguration = Hooks<typeof this> & AHC,
> {
  public readonly component: C;
  public readonly form: FormInstance;
  public readonly hooks: HookManager<HC>;

  public readonly props = {} as C extends Component ? MagicFormProps<C>['props'] : never;

  protected readonly config: PlainElementConfig<C, AHC, HC>;

  constructor(form: FormInstance, config: PlainElementConfig<C, AHC, HC>) {
    this.hooks = new HookManager<HC>({...config, hookNames: [...AVAILABLE_HOOKS, ...(config.hookNames ?? [])]});

    Object.keys(config)
      .filter((key) => !this.hooks.availableHooks.includes(key as keyof HC))
      .forEach((key) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this[key] = config[key];
      });

    this.form = form;
    this.config = config;

    if (isOfType<ConcreteComponent>(config.component, 'props')) {
      this.component = markRaw(config.component);
    } else {
      this.component = config.component;
    }
  }
}
