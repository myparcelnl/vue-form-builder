<template>
  <component
    :is="element.component"
    v-bind="element.props"
    v-on="hooks" />
</template>

<script lang="ts">
import {PropType, computed, defineComponent, toRefs} from 'vue';
import {BaseField} from '../services';

export default defineComponent({
  name: 'BaseElementComponent',

  props: {
    element: {
      type: Object as PropType<BaseField>,
      required: true,
    },
  },

  setup: (props) => {
    const propRefs = toRefs(props);

    return {
      propRefs,
      hooks: computed(() => {
        return props.element.hooks.registeredHooks.reduce(
          (acc, hook) => ({
            ...acc,
            [hook.name]: hook.callback,
          }),
          {},
        );
      }),
    };
  },
});
</script>
