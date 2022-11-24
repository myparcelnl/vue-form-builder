import {AnyElementConfiguration, ComponentOrHtmlElement, ElementName} from '../../types';
import {PLAIN_ELEMENT_HOOKS, PlainElementInstance} from './PlainElement.types';
import {markRaw, ref} from 'vue';
import {FormInstance} from '../Form.types';
import {createHookManager} from '@myparcel-vfb/hook-manager';
import {useDynamicWatcher} from '../../utils/useDynamicWatcher';

export class PlainElement<
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  N extends ElementName = ElementName,
> {
  public readonly name: N;
  public label?: string;
  public readonly component: C;
  public readonly form: FormInstance;
  public declare hooks: PlainElementInstance<C, N>['hooks'];

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  public isVisible: PlainElementInstance<C, N>['isVisible'] = ref(true);

  public readonly props = {} as PlainElementInstance<C, N>['props'];

  protected readonly config: AnyElementConfiguration<C, N>;

  public constructor(form: FormInstance, config: AnyElementConfiguration<C, N>) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    this.hooks = createHookManager({
      ...config,
      hookNames: [...PLAIN_ELEMENT_HOOKS, ...(config.hookNames ?? [])],
    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    this.name = config.name;

    const availableHooks = this.hooks.getAvailableHooks();

    Object.keys(config)
      .filter((key) => !availableHooks.includes(key))
      .forEach((key) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        this[key] = config[key];
      });

    this.form = form;
    this.config = config;

    if ('visibleCb' in config) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      useDynamicWatcher(() => this.config.visibleCb(this), this.isVisible);
    }

    if (typeof config.component === 'string') {
      this.component = config.component;
      return;
    }

    this.component = markRaw(config.component) as C;
  }

  public setVisible(value: boolean): void {
    this.isVisible.value = value;
  }
}
