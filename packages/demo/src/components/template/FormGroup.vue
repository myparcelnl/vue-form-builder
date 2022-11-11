<template>
  <div class="grid grid-cols-3 items-center justify-center w-full">
    <label
      v-if="label"
      :for="name"
    >
      {{ label }}
    </label>

    <slot />
    <span v-if="optional"> (optional)</span>
    <ul v-if="warnings">
      <li
        v-for="warning in warnings"
        :key="warning">
        {{ warning }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {defineComponent, toRef, unref} from 'vue';

export default defineComponent({
  name: 'FormGroup',
  props: {
    name: {
      type: String,
      default: null,
    },

    label: {
      type: String,
      default: null,
    },

    optional: {
      type: Boolean,
      default: false,
    },

    warnings: {
      type: Object,
      default: () => [],
    },
  },
});
</script>
