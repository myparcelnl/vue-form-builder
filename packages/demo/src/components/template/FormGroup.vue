<template>
  <div class="grid grid-cols-2 items-center justify-center relative w-full">
    <div>
      <label
        v-if="label"
        :for="name"
        v-text="label" />
    </div>

    <div>
      <slot />
    </div>

    <div
      v-if="warnings.length"
      class="bg-red-700 border border-red-800 col-span-2 dark:bg-red-900 mt-3 p-5 rounded-lg">
      <ul>
        <li
          v-for="warning in warnings"
          :key="warning"
          v-text="warning" />
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {translate} from '../../translate.js';

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

    warnings: {
      type: Object,
      default: () => ({}),
    },
  },

  setup: () => {
    return {
      translate,
    };
  },
});
</script>
