<template>
  <FormGroup>
    <input
      v-model="model"
      type="hidden"
      :disabled="disabled" />
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
      type: String,
      default: null,
    },

    disabled: {
      type: Boolean,
    },
  },

  setup: (props) => ({
    model: useVModel(props, 'modelValue'),
  }),
});
</script>
