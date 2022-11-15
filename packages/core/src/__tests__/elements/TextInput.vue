<template>
  <input
    :id="id"
    v-model="value"
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
  <span
    v-if="suspended"
    class="loading-indicator"
    v-text="translate('loading')">
  </span>
  <ul
    v-if="warningsRef.length"
    class="warnings">
    <li
      v-for="warning in warningsRef"
      :key="warning">
      {{ warning }}
    </li>
  </ul>
</template>

<script lang="ts">
import {computed, defineComponent, toRef} from 'vue';
import {translate} from '@myparcel-vfb/demo/src/translate.js';

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

    // eslint-disable-next-line vue/no-unused-properties
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

  setup: (props, {emit}) => {
    const value = computed({
      get() {
        return props.modelValue;
      },
      set(value) {
        emit('update:modelValue', value);
      },
    });

    return {
      translate,
      value,
      warningsRef: toRef(props, 'warnings'),
    };
  },
});
</script>
