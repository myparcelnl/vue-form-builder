<template>
  <FormGroup>
    <input
      v-model="model"
      type="hidden" />
  </FormGroup>
</template>

<script lang="ts">
import FormGroup from './FormGroup.vue';
import {defineComponent} from 'vue';
import {useVModel} from '@vueuse/core';

export default defineComponent({
  name: 'TTextInput',
  components: {FormGroup},
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
