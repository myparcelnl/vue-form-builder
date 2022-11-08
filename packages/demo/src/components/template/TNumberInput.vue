<template>
  <FormGroup v-bind="{label, id}">
    <TTextInput
      :id="id"
      v-model="model"
      :name="name"
      type="number"
      :min="min"
      :max="max"
      :disabled="!disabled"
      :valid="valid" />
  </FormGroup>
</template>

<script lang="ts">
import FormGroup from './FormGroup.vue';
import TTextInput from './TTextInput.vue';
import {defineComponent} from 'vue';
import {useVModel} from '@vueuse/core';

export default defineComponent({
  name: 'TNumberInput',
  components: {TTextInput, FormGroup},
  props: {
    // eslint-disable-next-line vue/no-unused-properties
    modelValue: {
      type: [String, Number],
      default: null,
    },

    id: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    label: {
      type: String,
      default: null,
    },

    disabled: {
      type: Object,
    },

    min: {
      type: Number,
      default: null,
    },

    max: {
      type: Number,
      default: null,
    },

    valid: {
      type: Object,
    },
  },

  setup: (props) => {
    return {
      model: useVModel(props, 'modelValue'),
    };
  },
});
</script>
