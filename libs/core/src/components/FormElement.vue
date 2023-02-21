<template>
  <component
    :is="element.component"
    v-model="model"
    v-bind="attributes"
    v-on="hooks">
    <slot />
  </component>
</template>

<script lang="ts">
import {PropType, computed, defineComponent} from 'vue';
import {AnyElementInstance} from '../types';
import {createElementHooks} from '../composables';

export default defineComponent({
  name: 'FormElement',
  props: {
    element: {
      type: Object as PropType<AnyElementInstance>,
      required: true,
    },
  },

  emits: ['blur', 'focus', 'click'],

  setup: (props) => {
    return {
      hooks: createElementHooks(props.element, {
        blur: props.element.blur,
        focus: props.element.focus,
        click: props.element.click,
      }),

      model: computed({
        get() {
          return props.element.ref;
        },
        set(value) {
          // eslint-disable-next-line vue/no-mutating-props
          props.element.ref = value;
        },
      }),

      /**
       * Collect attributes. Always adds `element.attributes`, but only adds `element` if element is a Vue component.
       */
      attributes: computed(() => {
        const elementProp = props.element.form?.config.field?.elementProp;

        return {
          ...props.element.attributes,

          ...(typeof props.element.component === 'string' || !elementProp ? {} : {element: props.element}),
        };
      }),
    };
  },
});
</script>
