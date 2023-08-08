import {type Component, computed, defineComponent, h, markRaw, onMounted, ref} from 'vue';
import {
  type AnyElementConfiguration,
  type AnyElementInstance,
  type ComponentOrHtmlElement,
  type ElementName,
  type ResolvedElementConfiguration,
} from '../types';
import {useForm} from '../composables';
import Fragment from '../components/Fragment.vue';
import FormElement from '../components/FormElement.vue';

/**
 * Define a field for use in a form.
 *
 * @example defineField({name: 'name', component: 'input', props: {type: 'text'}})
 */
export const defineField = <
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  N extends ElementName = ElementName,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  RT = any,
>(
  field: AnyElementConfiguration<C, N, RT>,
): ResolvedElementConfiguration<C, N, RT> => {
  return field as ResolvedElementConfiguration<C, N, RT>;
};

export const defineFieldNew = <
  C extends ComponentOrHtmlElement = ComponentOrHtmlElement,
  N extends ElementName = ElementName,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  RT = any,
>(
  field: AnyElementConfiguration<C, N, RT>,
): {
  Component: Component;
  Errors: Component;
  Label: Component;
  field: ResolvedElementConfiguration<C, N, RT>;
} => {
  const component = defineComponent({
    setup() {
      console.log('field', field.name, field);
      const form = useForm();
      const element = ref<null | AnyElementInstance>(null);

      onMounted(async () => {
        // @ts-expect-error todo
        element.value = await form.addElement(field);

        console.log('element', element.value);
      });

      return {
        form,
        element,
        field,
      };
    },

    render() {
      this.$options.name = `${this.form.name}:${field.name}`;

      return h(Fragment, () => [
        this.element
          ? h(
              FormElement,
              {
                form: this.form,
                element: this.element,
                field: this.field,
              },
              this.$slots,
            )
          : null,
      ]);
    },
  });

  const errors = defineComponent({
    setup() {
      const element = ref<null | AnyElementInstance>(null);
      const form = useForm();

      onMounted(async () => {
        // @ts-expect-error todo
        element.value = form.getField(field.name);
      });

      return {
        errors: computed(() => {
          console.warn('element', element.value);
          return element.value?.errors ?? [];
        }),
      };
    },

    render() {
      return h(Fragment, {component: 'div'}, () => {
        console.warn('errors', this.errors);
        return this.$slots.default?.({errors: this.errors ?? []});
      });
    },
  });

  return {
    field: markRaw(field) as ResolvedElementConfiguration<C, N, RT>,
    Component: component,
    Errors: errors,
    Label: defineComponent({
      setup() {
        const element = ref<null | AnyElementInstance>(null);
        const form = useForm();

        onMounted(async () => {
          // @ts-expect-error todo
          element.value = form.getField(field.name);
        });

        return {
          element,
        };
      },

      render() {
        return h(Fragment, {component: 'label'}, () => [this.element?.label]);
      },
    }),
  };
};
