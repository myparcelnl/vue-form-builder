<template>
  <input
    v-model="model"
    type="hidden" />
</template>

<script lang="ts">
import {type PropType, defineComponent} from 'vue';
import {useVModel} from '@vueuse/core';
import {type InteractiveElementInstance} from '@myparcel/vue-form-builder';

export default defineComponent({
  name: 'TTextInput',
  props: {
    element: {
      type: Object as PropType<InteractiveElementInstance>,
      required: true,
    },

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
