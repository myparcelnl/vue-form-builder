<template>
  <input
    :id="id"
    v-model.number="model"
    type="number"
    :class="{
      'border-red-500': valid === false,
      'opacity-50 cursor-not-allowed': disabled,
    }"
    :disabled="disabled"
    :max="max"
    :min="min"
    :name="name"
    :step="step"
    @blur="$emit('blur', $event)"
    @change="$emit('change', $event)"
    @click="$emit('click', $event)"
    @focus="$emit('focus', $event)"
    @focusin="$emit('focusin', $event)"
    @focusout="$emit('focusout', $event)" />
</template>

<script lang="ts">
import {PropType, defineComponent} from 'vue';
import {useVModel} from '@vueuse/core';

export default defineComponent({
  name: 'TNumberInput',
  props: {
    disabled: {
      type: Boolean,
    },

    // eslint-disable-next-line vue/no-unused-properties
    errors: {
      type: Array as PropType<string[]>,
      default: () => [],
    },

    id: {
      type: String,
      required: true,
    },

    // eslint-disable-next-line vue/no-unused-properties
    label: {
      type: String,
      default: null,
    },

    max: {
      type: Number,
      default: null,
    },

    min: {
      type: Number,
      default: 0,
    },

    // eslint-disable-next-line vue/no-unused-properties
    modelValue: {
      type: [String, Number],
      default: null,
    },

    name: {
      type: String,
      required: true,
    },

    // eslint-disable-next-line vue/no-unused-properties
    optional: {
      type: Boolean,
    },

    step: {
      type: Number,
      default: 1,
    },

    // eslint-disable-next-line vue/no-unused-properties
    suspended: {
      type: Boolean,
    },

    valid: {
      type: Boolean,
    },
  },

  emits: ['update:modelValue', 'blur', 'focus', 'focusin', 'focusout', 'click', 'change'],

  setup: (props) => {
    return {
      model: useVModel(props, 'modelValue'),
    };
  },
});
</script>
