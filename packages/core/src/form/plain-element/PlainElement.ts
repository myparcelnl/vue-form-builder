import {BaseElementConfiguration, ComponentOrHtmlElement, FormComponentProps} from '../../types';
import {Component, ConcreteComponent, markRaw} from 'vue';
import {HookManager, HookManagerInput, createHookManager} from '@myparcel/vue-form-builder-hook-manager';
import {PlainElementHooks, PlainElementInstance} from './PlainElement.types';
import {COMPONENT_LIFECYCLE_HOOKS} from '../../composables';
import {FormInstance} from '../Form.types';
import {isOfType} from '@myparcel/vue-form-builder-utils';

export const PLAIN_ELEMENT_HOOKS = ['click', 'focus', ...COMPONENT_LIFECYCLE_HOOKS] as const;

export class PlainElement<C extends ComponentOrHtmlElement = ComponentOrHtmlElement> {
  public readonly component: C;
  public readonly form: FormInstance;
  public readonly hooks: HookManager;

  public readonly props = {} as C extends Component ? FormComponentProps<C> : never;

  protected readonly config: BaseElementConfiguration<C, PlainElementInstance<C>> &
    HookManagerInput<typeof PLAIN_ELEMENT_HOOKS, PlainElementHooks>;

  constructor(
    form: FormInstance,
    config: BaseElementConfiguration<C, PlainElementInstance<C>> &
      HookManagerInput<typeof PLAIN_ELEMENT_HOOKS, PlainElementHooks>,
  ) {
    this.hooks = createHookManager({...config, hookNames: PLAIN_ELEMENT_HOOKS});

    Object.keys(config)
      .filter((key) => !this.hooks.availableHooks.includes(key))
      .forEach((key) => {
        // TODO: fix types
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
