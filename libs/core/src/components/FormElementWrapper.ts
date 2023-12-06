import {type Component, defineComponent, h, type PropType, provide, Teleport, type VNode} from 'vue';
import {isOfType} from '@myparcel/ts-utils';
import {type AnyElementInstance, type FormInstance} from '../types';
import {INJECT_ELEMENT} from '../symbols';
import {useTestAttributes} from '../composables';
import FormElement from './FormElement.vue';

// noinspection JSUnusedGlobalSymbols
export default defineComponent({
  name: 'FormElementWrapper',
  props: {
    form: {
      type: Object as PropType<FormInstance>,
      required: true,
    },
    element: {
      type: Object as PropType<AnyElementInstance>,
      required: true,
    },
  },

  setup(props) {
    provide(INJECT_ELEMENT, props.element);
  },

  render() {
    let component: Component = h(
      FormElement,
      {
        ...this.$attrs,
        ...useTestAttributes(this.element),
        element: this.element,
      },
      {
        ...(isOfType<VNode>(this.element.component, 'children')
          ? [
              Array.isArray(this.element.component.children)
                ? this.element.component.children.map((child: unknown) => {
                    return typeof child === 'function' ? child : () => child;
                  })
                : this.element.component.children,
            ]
          : []),
        ...this.element.slots,
        ...this.$slots,
      },
    );

    const hasOwnWrapper = typeof this.element.wrapper !== 'boolean';
    const inheritsWrapper = this.element.wrapper === true && this.form.config.field?.wrapper;

    if (inheritsWrapper || hasOwnWrapper) {
      const childComponent = component;

      component = h(
        (hasOwnWrapper ? this.element.wrapper : this.form.config.field?.wrapper) as Component,
        {
          ...this.$attrs,
          ...this.form.config.fieldDefaults?.attributes,
          element: this.element,
        },
        {...this.element.slots, default: () => childComponent},
      );
    }

    if (this.element.teleportSelector) {
      // @ts-expect-error Teleport has an extra property which doesn't fit in the Component type
      return h(Teleport, {to: this.element.teleportSelector}, [component]);
    }

    return component;
  },
});
