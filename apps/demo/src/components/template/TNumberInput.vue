<template>
  <FormGroup v-bind="{label, id, errors, optional}">
    <LoadingOverlay v-if="suspended" />
    <input
      :id="id"
      v-model.number="model"
      type="number"
      v-bind="$attrs"
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
  </FormGroup>
</template>

<script lang="ts">
import {PropType, defineComponent} from 'vue';
import FormGroup from './FormGroup.vue';
import LoadingOverlay from '../LoadingOverlay.vue';
import {useVModel} from '@vueuse/core';

export default defineComponent({
  name: 'TNumberInput',
  components: {LoadingOverlay, FormGroup},
  inheritAttrs: false,
  props: {
    disabled: {
      type: Boolean,
    },

    errors: {
      type: Array as PropType<string[]>,
      default: () => [],
    },

    id: {
      type: String,
      required: true,
    },

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

    optional: {
      type: Boolean,
    },

    step: {
      type: Number,
      default: 1,
    },

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
