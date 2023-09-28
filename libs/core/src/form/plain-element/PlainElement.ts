import {computed, type ComputedRef, markRaw, reactive, ref} from 'vue';
import {get} from '@vueuse/core';
import {type FunctionOr} from '@myparcel-vfb/utils';
import {createHookManager} from '@myparcel-vfb/hook-manager';
import {type FormInstance} from '../Form.types';
import {useDynamicWatcher} from '../../utils';
import {type AnyElementConfiguration, type ComponentOrHtmlElement, type ElementName} from '../../types';
import {PLAIN_ELEMENT_HOOKS} from './hooks';
import {type PlainElementInstance} from './PlainElement.types';

// noinspection JSUnusedGlobalSymbols
export class PlainElement<
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  N extends ElementName = ElementName,
> {
  public declare hooks: PlainElementInstance<C, N>['hooks'];

  public errors = ref<FunctionOr<string>[]>([]);

  public readonly attributes: PlainElementInstance<C, N>['attributes'];
  public readonly component: C;
  public readonly form: FormInstance;
  public readonly formattedErrors: ComputedRef<string[]>;
  public readonly isVisible: PlainElementInstance<C, N>['isVisible'] = ref(true);
  public readonly name: N;
  public readonly props: PlainElementInstance<C, N>['props'];
  public readonly wrapper: PlainElementInstance<C, N>['wrapper'];

  protected readonly config: AnyElementConfiguration<C, N>;

  public constructor(form: FormInstance, config: AnyElementConfiguration<C, N>) {
    // @ts-expect-error todo
    this.hooks = createHookManager({
      ...config,
      hookNames: [...PLAIN_ELEMENT_HOOKS, ...(config.hookNames ?? [])],
    });

    const availableHooks = this.hooks.getAvailableHooks();

    Object.keys(config)
      .filter((key) => !availableHooks.includes(key))
      .forEach((key) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        this[key] = config[key];
      });

    this.props = reactive(config.props ?? ({} as PlainElementInstance<C, N>['props']));
    this.attributes = reactive(config.attributes ?? {});

    this.config = config;
    this.form = form;
    this.name = config.name as N;
    this.wrapper = config.wrapper ?? true;

    this.setVisible(config.visible ?? true);

    this.formattedErrors = computed(() => {
      return get(this.errors).map((error) => (typeof error === 'function' ? error() : error));
    });

    if ('visibleWhen' in config) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      useDynamicWatcher(() => this.config.visibleWhen(this), this.isVisible);
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

  public resetValidation(): void {
    this.errors.value = [];
  }
}
