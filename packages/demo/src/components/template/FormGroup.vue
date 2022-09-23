<template>
  <div class="grid grid-cols-2 items-center justify-center w-full">
    <label
      v-if="label"
      :for="name"
      >{{ label }}</label
    >

    <slot />
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

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
  },
});
</script>
