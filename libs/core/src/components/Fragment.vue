<template>
  <component
    :is="component"
    v-if="component">
    <slot />
  </component>
  <slot v-else />
</template>

<script lang="ts">
import {PropType, defineComponent} from 'vue';
import {ComponentOrHtmlElement} from '../types';

export default defineComponent({
  name: 'Fragment',
  props: {
    component: {
      type: [String, Object] as PropType<ComponentOrHtmlElement>,
      default: null,
    },
  },
});
</script>
