import {
  defineComponent,
  type Component,
  ref,
  onMounted,
  onUnmounted,
  h,
  computed,
  type ComputedRef,
  toValue,
  markRaw,
  defineAsyncComponent,
  reactive,
  type Ref,
} from 'vue';
import {type FieldConfiguration, type FieldInstance, type ModularCreatedField} from '../types/field.types';
import {type ComponentProps} from '../types/component.types';
import {useForm} from '../composables/useForm';
import FormElementWrapper from '../components/FormElementWrapper';
import {generateFieldName} from './generateFieldName';

// eslint-disable-next-line max-lines-per-function
const createMainComponent = <Type = unknown, Props extends ComponentProps = ComponentProps>(
  field: FieldConfiguration<Type, Props>,
  attrs: Record<string, unknown>,
  slots: Record<string, unknown>,
): Component => {
  return defineComponent({
    setup() {
      const form = useForm();
      const element = ref();

      onMounted(async () => {
        element.value = await form.addElement(field);
      });

      onUnmounted(() => {
        if (element.value) {
          form.removeElement(element.value.name);
          element.value = undefined;
        }
      });

      return {
        element,
        form,
      };
    },

    emits: [
      'afterBlur',
      'afterSanitize',
      'afterUpdate',
      'afterValidate',
      'beforeBlur',
      'beforeSanitize',
      'beforeUpdate',
      'beforeValidate',
      'blur',
    ],

    render() {
      if (import.meta.env.DEV && !this.$options.name && this.element) {
        this.$options.name = generateFieldName(this.element);
      }

      return (
        this.element &&
        h(
          FormElementWrapper,
          {
            ...attrs,
            ...this.$attrs,
            form: this.form,
            element: this.element,
          },
          {
            ...this.$slots,
            ...slots,
          },
        )
      );
    },
  });
};

const createLabelComponent = <Type = unknown, Props extends ComponentProps = ComponentProps>(
  field: FieldConfiguration<Type, Props>,
): Component => {
  return defineComponent({
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
};

const createErrorComponent = <Type = unknown, Props extends ComponentProps = ComponentProps>(
  field: FieldConfiguration<Type, Props>,
): Component => {
  return defineComponent({
    setup(): {
      element: ComputedRef;
    } {
      const form = useForm();
      const element = computed(() => (field.name ? form.getField<FieldInstance>(field.name) : undefined));

      return {element};
    },

    render() {
      if (import.meta.env.DEV && !this.$options.name && this.element) {
        this.$options.name = generateFieldName(this.element, 'errors');
      }

      return toValue(this.element?.errors) && this.$slots.default?.({errors: toValue(this.element.errors)});
    },
  });
};

const createAsyncComponent = <C extends Component>(cb: () => C) => {
  return markRaw(defineAsyncComponent(() => Promise.resolve(cb())));
};

export const createField = <Type = unknown, Props extends ComponentProps = ComponentProps>(
  field: FieldConfiguration<Type, Props>,
): ModularCreatedField<Type, Props> => {
  // @ts-expect-error todo
  return reactive({
    field,
    ref: (field.ref ?? ref<Type>()) as Type extends undefined ? undefined : Ref<Type>,
    Component: markRaw((_, ctx) => h(createMainComponent(field, ctx.attrs, ctx.slots))),
    Errors: createAsyncComponent(() => createErrorComponent(field)),
    Label: createAsyncComponent(() => createLabelComponent(field)),
  });
};
