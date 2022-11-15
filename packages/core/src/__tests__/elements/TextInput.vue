<template>
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
  <span
    v-if="suspended"
    class="loading-indicator">
    Loading...
  </span>
  <ul
    v-if="errors.length"
    class="errors">
    <li
      v-for="warning in errors"
      :key="warning">
      {{ warning }}
    </li>
  </ul>
</template>

<script lang="ts">
import {PropType, computed, defineComponent} from 'vue';

export default defineComponent({
  name: 'TextInput',
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

    // eslint-disable-next-line vue/no-unused-properties
    label: {
      type: String,
      default: null,
    },

    modelValue: {
      type: String,
      default: null,
    },

    name: {
      type: String,
      required: true,
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
    return {
      model: computed({
        get() {
          return props.modelValue;
        },
        set(value) {
          emit('update:modelValue', value);
        },
      }),
    };
  },
});
</script>
