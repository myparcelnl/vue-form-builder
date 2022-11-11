<template>
  <input
    type="text"
    :id="id"
    v-model="value"
    :name="name"
    v-bind="$attrs"
    :disabled="disabled"
    :class="{
      'border-red-500': !isValid(),
    }"
    @blur="$emit('blur', $event)"
    @focus="$emit('focus', $event)"
    @focusin="$emit('focusin', $event)"
    @focusout="$emit('focusout', $event)"
    @click="$emit('click', $event)"
    @change="$emit('change', $event)" />
    <span class="loading-indicator" v-if="suspended">
      Loading...
    </span>
    <ul v-if="warnings.length" class="warnings">
      <li
        v-for="warning in warnings"
        :key="warning">
        {{ warning }}
      </li>
    </ul>
</template>

<script lang="ts">
import {computed, defineComponent, Ref, toRef} from 'vue';

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
      type: Boolean,
      default: false,
    },
    valid: {
      type: Boolean,
      default: true,
    },
    suspended: {
      type: Boolean,
      default: false,
    },
    warnings: {
      type: Array<String>,
      default: () => [],
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
