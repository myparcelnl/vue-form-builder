<template>
  <FormGroup v-bind="{label, id, warnings}">
    <LoadingOverlay v-if="suspended" />
    <input
      :id="id"
      v-model="model"
      type="text"
      :name="name"
      v-bind="$attrs"
      :disabled="disabled"
      :class="{
        'border-red-500': valid === false,
        'opacity-50 cursor-not-allowed': disabled,
      }"
      @blur="$emit('blur', $event)"
      @focus="$emit('focus', $event)"
      @focusin="$emit('focusin', $event)"
      @focusout="$emit('focusout', $event)"
      @click="$emit('click', $event)"
      @change="$emit('change', $event)" />
  </FormGroup>
</template>

<script lang="ts">
import FormGroup from './FormGroup.vue';
import LoadingOverlay from '../LoadingOverlay.vue';
import {defineComponent} from 'vue';
import {useVModel} from '@vueuse/core';

export default defineComponent({
  name: 'TTextInput',
  components: {LoadingOverlay, FormGroup},
  inheritAttrs: false,
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

    warnings: {
      type: Object,
      default: () => ({}),
    },

    disabled: {
      type: Boolean,
    },

    suspended: {
      type: Boolean,
    },

    valid: {
      type: Boolean,
    },
  },

  emits: ['update:modelValue', 'change', 'blur', 'focus', 'focusin', 'focusout', 'click'],

  setup: (props) => {
    return {
      model: useVModel(props, 'modelValue'),
    };
  },
});
</script>
