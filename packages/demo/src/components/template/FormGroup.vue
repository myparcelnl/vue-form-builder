<template>
  <div class="grid grid-cols-3 items-center justify-center w-full">
    <label
      v-if="label"
      :for="name"
      >{{ label }}</label
    >

    <slot />
    <ul v-if="warningsRef">
      <li
        v-for="warning in warningsRef"
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

    warnings: {
      type: Object,
      default: () => [],
    },
  },
  setup: (props) => {
    return {
      warningsRef: toRef(props, 'warnings'),
    }
  },

});
</script>
