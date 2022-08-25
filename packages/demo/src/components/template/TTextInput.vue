<template>
  <FormGroup v-bind="{label, id}">
    <input
      :id="id"
      v-model="model"
      :name="name"
      v-bind="$attrs"
      :disabled="disabled"
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
import {defineComponent} from 'vue';
import {useVModel} from '@vueuse/core';

export default defineComponent({
  name: 'TTextInput',
  components: {FormGroup},
  inheritAttrs: false,
  props: {
    // eslint-disable-next-line vue/no-unused-properties
    modelValue: {
      type: String,
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
      type: Boolean,
    },
  },

  emits: ['update:modelValue', 'change', 'blur', 'focus', 'focusin', 'focusout', 'click'],

  setup: (props) => ({
    model: useVModel(props, 'modelValue'),
  }),
});
</script>
