import {AnyElementConfiguration, ComponentHooks, ComponentOrHtmlElement, ElementName, ElementProps} from '../../types';
import {HookManager, createHookManager} from '@myparcel/vue-form-builder-hook-manager';
import {PLAIN_ELEMENT_HOOKS, PlainElementHooks, PlainElementInstance} from './PlainElement.types';
import {FormInstance} from '../Form.types';
import {markRaw} from 'vue';

type Hooks<C extends ComponentOrHtmlElement> = PlainElementHooks & ComponentHooks<C, PlainElementInstance<C>>;

export class PlainElement<
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  N extends ElementName = ElementName,
> {
  public readonly name: N;
  public readonly component: C;
  public readonly form: FormInstance;
  public declare hooks: HookManager<typeof PLAIN_ELEMENT_HOOKS[number], Hooks<C>>;

  public readonly props = {} as ElementProps<C>;

  protected readonly config: AnyElementConfiguration<C>;

  public constructor(form: FormInstance, config: AnyElementConfiguration<C>) {
    this.hooks = createHookManager<typeof PLAIN_ELEMENT_HOOKS[number], Hooks<C>>({
      ...config,
      hookNames: [...PLAIN_ELEMENT_HOOKS, ...(config.hookNames ?? [])],
    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.name = config.name;

    Object.keys(config)
      .filter((key) => !this.hooks.availableHooks.includes(key as typeof PLAIN_ELEMENT_HOOKS[number]))
      .forEach((key) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        this[key] = config[key];
      });

    this.form = form;
    this.config = config;

    if (typeof config.component === 'string') {
      this.component = config.component;
      return;
    }

    this.component = markRaw(config.component) as C;
  }
}
