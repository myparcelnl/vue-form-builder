import {type Component, defineComponent, h, type PropType, provide, Teleport, type VNode} from 'vue';
import {isOfType} from '@myparcel/ts-utils';
import {type AnyElementInstance, type ComponentOrHtmlElement, type FormInstance} from '../types';
import {INJECT_ELEMENT} from '../symbols';
import {useTestAttributes} from '../composables';
import FormElement from './FormElement.vue';

// noinspection JSUnusedGlobalSymbols
type RawSlots = {
  [name: string]: unknown;
  $stable?: boolean;
};

const convertSlots = (component: ComponentOrHtmlElement) => {
  const slotList = [];
  let slotMap: RawSlots = {};

  if (isOfType<VNode>(component, 'children')) {
    if (Array.isArray(component.children)) {
      component.children.forEach((child: unknown) => {
        slotList.push(typeof child === 'function' ? child : () => child);
      });
    } else if (isOfType<RawSlots>(component, 'children')) {
      slotMap = component.children as RawSlots;
    } else {
      slotList.push(component.children);
    }
  }

  return {...slotList, ...slotMap};
};

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
    const childrenSlots = convertSlots(this.element.component);

    let component: Component = h(
      FormElement,
      {
        ...this.$attrs,
        ...useTestAttributes(this.element),
        element: this.element,
      },
      {
        ...childrenSlots,
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
