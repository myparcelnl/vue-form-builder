<template>
  <input
    v-model="model"
    type="hidden" />
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {useVModel} from '@vueuse/core';

export default defineComponent({
  name: 'TTextInput',
  props: {
    // eslint-disable-next-line vue/no-unused-properties
    modelValue: {
      type: [String, Number],
      default: null,
    },
  },

  setup: (props) => ({
    model: useVModel(props, 'modelValue'),
  }),
});
</script>
