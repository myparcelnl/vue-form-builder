<template>
  <input
    v-model="value"
    v-bind="$attrs"
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
  },

  emits: ['update:modelValue', 'change', 'blur', 'focus', 'focusin', 'focusout', 'click'],

  setup: (props, { emit, attrs }) => {

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
    };
  },
});
</script>
