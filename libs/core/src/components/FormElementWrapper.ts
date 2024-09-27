import {type Component, defineComponent, h, type PropType, provide} from 'vue';
import {type FormInstance, type FieldInstance} from '../types';
import {INJECT_ELEMENT} from '../symbols';
import {useTestAttributes} from '../composables';
import FormElement from './FormElement.vue';

export default defineComponent({
  name: 'FormElementWrapper',
  props: {
    form: {
      type: Object as PropType<FormInstance>,
      required: true,
    },
    element: {
      type: Object as PropType<FieldInstance>,
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
      this.$slots,
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
        {default: () => childComponent},
      );
    }

    return component;
  },
});
