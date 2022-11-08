<template>
  <input
    type="text"
    :id="id"
    v-model="value"
    :name="name"
    v-bind="$attrs"
    :disabled="!disabled"
    :class="{
      'border-red-500': !isValid(),
    }"
    @blur="$emit('blur', $event)"
    @focus="$emit('focus', $event)"
    @focusin="$emit('focusin', $event)"
    @focusout="$emit('focusout', $event)"
    @click="$emit('click', $event)"
    @change="$emit('change', $event)" />
</template>

<script lang="ts">
import {computed, defineComponent, Ref} from 'vue';

export default defineComponent({
  name: 'TextInput',
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
      type: Object,
      default: false,
    },
    valid: {
      type: Object,
      default: true,
    },
  },
  emits: ['update:modelValue', 'change', 'blur', 'focus', 'focusin', 'focusout', 'click'],
  setup: (props, { emit, attrs }) => {
    const isValid = () => {
      return props.valid === undefined ? true : props.valid;
    };

    const value = computed({
      get() {
        return props.modelValue;
      },
      set(value) {
        emit('update:modelValue', value);
      },
    });

    return {
      value,
      isValid,
    };
  },
});
</script>
