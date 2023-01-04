import {AnyAttributes, FunctionOr} from '@myparcel-vfb/utils';
import {AnyElementConfiguration, ComponentOrHtmlElement, ElementName} from '../../types';
import {ComputedRef, computed, isRef, markRaw, ref} from 'vue';
import {PLAIN_ELEMENT_HOOKS, PlainElementInstance} from './PlainElement.types';
import {FormInstance} from '../Form.types';
import {createHookManager} from '@myparcel-vfb/hook-manager';
import {useDynamicWatcher} from '../../utils';

export class PlainElement<
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  N extends ElementName = ElementName,
> {
  public readonly name: N;
  public readonly component: C;

  public declare hooks: PlainElementInstance<C, N>['hooks'];

  public errors = ref<FunctionOr<string>[]>([]);

  public readonly attributes: AnyAttributes;
  public readonly form: FormInstance;
  public readonly formattedErrors: ComputedRef<string[]>;
  public readonly isVisible: PlainElementInstance<C, N>['isVisible'] = ref(true);
  public readonly props = {} as PlainElementInstance<C, N>['props'];
  public readonly wrapper: PlainElementInstance<C, N>['wrapper'];

  protected readonly config: AnyElementConfiguration<C, N>;

  public constructor(form: FormInstance, config: AnyElementConfiguration<C, N>) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
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

    this.config = config;
    this.form = form;
    this.isVisible.value = config.visible ?? true;
    this.name = config.name as N;
    this.wrapper = config.wrapper ?? true;

    this.attributes = config.attributes ?? {};

    this.formattedErrors = computed(() => {
      return this.errors.value.map((error) => (typeof error === 'function' ? error() : error));
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
    // Todo: fix the .value issue similar to the one in the Form class
    if (isRef(this.errors)) {
      this.errors.value = [];
    } else {
      // @ts-expect-error errors is a schrodinger's ref
      this.errors = [];
    }
  }
}
