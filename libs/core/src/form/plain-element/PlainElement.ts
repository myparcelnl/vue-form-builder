import {computed, markRaw, reactive, ref, type UnwrapNestedRefs} from 'vue';
import {get} from '@vueuse/core';
import {type ComponentProps} from '@myparcel-vfb/utils';
import {createHookManager, type HookManagerInstance} from '@myparcel-vfb/hook-manager';
import {type FormInstance} from '../Form.types';
import {useDynamicWatcher} from '../../utils';
import {type ToRecord} from '../../types/common.types';
import {type BaseElementConfiguration, type BaseElementHooks, type BaseElementInstance} from '../../types';
import {PLAIN_ELEMENT_HOOKS} from '../../data';
import {type PlainElementInstance, type PlainElementHooks, type PlainElementConfiguration} from './PlainElement.types';

// noinspection JSUnusedGlobalSymbols
export class PlainElement<
  Props extends ComponentProps = ComponentProps,
  Config extends BaseElementConfiguration<Props> = PlainElementConfiguration<Props>,
  Hooks extends BaseElementHooks<BaseElementInstance<Props>> = PlainElementHooks<Props>,
> {
  public declare readonly hooks: HookManagerInstance<ToRecord<Hooks>>;

  public errors: PlainElementInstance<Props>['errors'] = ref([]);

  public readonly attributes: PlainElementInstance<Props>['attributes'];
  public readonly component: PlainElementInstance<Props>['component'];
  public readonly form: PlainElementInstance<Props>['form'];
  public readonly formattedErrors: PlainElementInstance<Props>['formattedErrors'];
  public readonly isVisible: PlainElementInstance<Props>['isVisible'] = ref(true);
  public readonly name: PlainElementInstance<Props>['name'];
  public readonly props: PlainElementInstance<Props>['props'];
  public readonly wrapper: PlainElementInstance<Props>['wrapper'];

  protected readonly config: Config;

  public constructor(form: FormInstance, config: ToRecord<Config>) {
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

    this.props = reactive(config.props ?? {}) as UnwrapNestedRefs<Props>;
    this.attributes = reactive(config.attributes ?? {});

    this.config = config;
    this.form = form;
    this.name = config.name;
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

    this.component = markRaw(config.component);
  }

  public setVisible(value: boolean): void {
    this.isVisible.value = value;
  }

  public resetValidation(): void {
    this.errors.value = [];
  }
}
