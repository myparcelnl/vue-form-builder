import {Component, PropType, Teleport, defineComponent, h} from 'vue';
import {AnyElementInstance} from '../types';
import FormElement from './FormElement.vue';
import {FormInstance} from '../form';
import {useTestAttributes} from '../composables';

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

  render() {
    let component: Component = h(FormElement, {
      ...useTestAttributes(this.element),
      element: this.element,
    });

    const hasOwnWrapper = typeof this.element.wrapper !== 'boolean';
    const inheritsWrapper = this.element.wrapper === true && this.form.config.field?.wrapper;

    if (inheritsWrapper || hasOwnWrapper) {
      const childComponent = component;

      component = h(
        (hasOwnWrapper ? this.element.wrapper : this.form.config.field?.wrapper) as Component,
        {
          ...this.$attrs,
          ...this.form.config.fieldDefaults.attributes,
          element: this.element,
        },
        () => [childComponent],
      );
    }

    if (this.element.teleportSelector) {
      // @ts-expect-error Teleport has an extra property which doesn't fit in the Component type
      return h(Teleport, {to: this.element.teleportSelector}, [component]);
    }

    return component;
  },
});
