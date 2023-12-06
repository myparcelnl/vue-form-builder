/* eslint-disable @typescript-eslint/naming-convention */
import {
  computed,
  defineComponent,
  h,
  markRaw,
  onMounted,
  type Ref,
  ref,
  reactive,
  type ComputedRef,
  type Component,
} from 'vue';
import {type ComponentProps} from '@myparcel-vfb/utils';
import {isOfType} from '@myparcel/ts-utils';
import {type AnyElementConfiguration, type ResolvedElementConfiguration, type ComponentOrHtmlElement} from '../types';
import {useForm} from '../composables';
import FormElementWrapper from '../components/FormElementWrapper';
import {type InteractiveElementConfiguration, type InteractiveElementInstance} from './interactive-element';
import {generateFieldName} from './generateFieldName';

export interface CreatedField<Type = unknown, Props extends ComponentProps = ComponentProps> {
  Component: ComponentOrHtmlElement<Props>;
  field: ResolvedElementConfiguration<Type, Props>;
  ref: Type extends undefined ? undefined : Ref<Type>;
}

export interface ModularCreatedField<Type = unknown, Props extends ComponentProps = ComponentProps>
  extends CreatedField<Type, Props> {
  /**
   * Only available when `wrapper` is `false`.
   * @TODO: reflect this in the type
   */
  Errors: ReturnType<typeof createErrorComponent>;

  /**
   * Only available when `wrapper` is `false`.
   * @TODO: reflect this in the type
   */
  Label: ReturnType<typeof createLabelComponent>;
}

const createMainComponent = <Type = unknown, Props extends ComponentProps = ComponentProps>(
  field: AnyElementConfiguration<Type, Props>,
): Component => {
  return defineComponent({
    setup() {
      const form = useForm();
      const element = ref();

      onMounted(async () => {
        element.value = await form.addElement(field);
      });

      return {
        element,
        form,
      };
    },

    render() {
      if (import.meta.env.DEV && !this.$options.name && this.element) {
        this.$options.name = generateFieldName(this.element);
      }

      return (
        this.element && h(FormElementWrapper, {...this.$attrs, form: this.form, element: this.element}, this.$slots)
      );
    },
  });
};

const createLabelComponent = (field: AnyElementConfiguration): Component =>
  defineComponent({
    setup() {
      const form = useForm();
      const element = computed(() => field.name && form.getField(field.name));

      return {element};
    },

    render() {
      if (import.meta.env.DEV && !this.$options.name && this.element) {
        this.$options.name = generateFieldName(this.element, 'label');
      }

      return this.element && h('label', {for: this.element.attributes.id ?? this.element.name}, [this.element.label]);
    },
  });

const createErrorComponent = (field: AnyElementConfiguration): Component => {
  return defineComponent({
    setup(): {
      element: ComputedRef<InteractiveElementInstance | undefined>;
    } {
      const form = useForm();
      const element = computed(() => (field.name ? form.getField<InteractiveElementInstance>(field.name) : undefined));

      return {element};
    },

    render() {
      if (import.meta.env.DEV && !this.$options.name && this.element) {
        this.$options.name = generateFieldName(this.element, 'errors');
      }

      return this.element?.errors && this.$slots.default?.({errors: this.element.errors});
    },
  });
};

export const createField = <Type = unknown, Props extends ComponentProps = ComponentProps>(
  field: AnyElementConfiguration<Type, Props>,
): ModularCreatedField<Type, Props> => {
  // @ts-expect-error todo
  return reactive({
    field,
    Component: markRaw(createMainComponent(field)),

    ...(isOfType<InteractiveElementConfiguration>(field, 'ref') && {
      ref: (field.ref ?? ref<Type>()) as Type extends undefined ? undefined : Ref<Type>,

      ...(field.wrapper === false && {
        Label: markRaw(createLabelComponent(field)),
        Errors: markRaw(createErrorComponent(field)),
      }),
    }),
  });
};
