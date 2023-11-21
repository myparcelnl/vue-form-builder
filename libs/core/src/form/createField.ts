/* eslint-disable @typescript-eslint/naming-convention */
import {computed, defineComponent, h, markRaw, onMounted, reactive, type Ref, ref, type Component} from 'vue';
import {
  type AnyElementConfiguration,
  type AnyElementInstance,
  type ElementName,
  type ResolvedElementConfiguration,
} from '../types';
import {useForm} from '../composables';
import FormElementWrapper from '../components/FormElementWrapper';
import {generateFieldName} from './generateFieldName';

export interface CreatedField<C extends Component = Component, N extends ElementName = ElementName, RT = unknown> {
  Component: C;
  field: ResolvedElementConfiguration<C, N, RT>;
  ref: RT extends undefined ? undefined : Ref<RT>;
}

export interface ModularCreatedField<C extends Component = Component, N extends ElementName = ElementName, RT = unknown>
  extends CreatedField<C, N, RT> {
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

const createMainComponent = (field: AnyElementConfiguration) => {
  return defineComponent({
    setup() {
      const form = useForm();
      const element = ref<null | AnyElementInstance>(null);

      onMounted(async () => {
        // @ts-expect-error todo
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
        this.element &&
        h(
          // TODO: figure out why this causes an error in the build
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          FormElementWrapper,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          {...this.$attrs, ...this.element.props, form: this.form, element: this.element},
          this.$slots,
        )
      );
    },
  });
};

const createLabelComponent = (field: AnyElementConfiguration) =>
  defineComponent({
    // props: SHARED_PROPS,

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

const createErrorComponent = (field: AnyElementConfiguration) => {
  return defineComponent({
    setup() {
      const form = useForm();
      const element = computed(() => field.name && form.getField(field.name));

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

export const createField = <C extends Component = Component, N extends ElementName = ElementName, RT = unknown>(
  field: AnyElementConfiguration<C, N, RT>,
): ModularCreatedField<C, N, RT> => {
  // @ts-expect-error todo
  return reactive({
    field,
    ref: (field.ref ?? ref<RT>()) as RT extends undefined ? undefined : Ref<RT>,
    Component: markRaw(createMainComponent(field)),

    ...(field.wrapper === false && {
      Label: markRaw(createLabelComponent(field)),
      Errors: markRaw(createErrorComponent(field)),
    }),
  });
};
