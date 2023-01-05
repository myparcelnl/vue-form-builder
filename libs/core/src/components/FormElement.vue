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
import {PropType, computed, defineComponent, provide} from 'vue';
import {AnyElementInstance} from '../types';
import {INJECT_ELEMENT} from '../services';
import {useElementHooks} from '../composables';

export default defineComponent({
  name: 'FormElement',
  props: {
    element: {
      type: Object as PropType<AnyElementInstance>,
      required: true,
    },
  },

  setup: (props) => {
    provide(INJECT_ELEMENT, props.element);

    return {
      hooks: useElementHooks(props.element, {
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
       * Collect attributes. Always adds `element.attributes`, but only adds `element` and `element.props` if element is a Vue component.
       */
      attributes: computed(() => {
        return {
          ...props.element.attributes,
          ...(typeof props.element.component === 'string'
            ? {}
            : {
                ...props.element.props,
                element: props.element,
              }),
        };
      }),
    };
  },
});
</script>
