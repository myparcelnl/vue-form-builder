<template>
  <template v-if="component">
    <component :is="component">
      <slot />
    </component>
  </template>
  <slot v-else />
</template>

<script lang="ts">
import {type PropType, defineComponent} from 'vue';
import {type ComponentOrHtmlElement} from '../types';

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
