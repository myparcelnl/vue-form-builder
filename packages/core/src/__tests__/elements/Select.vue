<template>
  <select
    :id="id"
    v-model="value"
    :name="name"
    :disabled="!disabled"
    :class="{
      'border-red-500': !isValid(),
    }"
    @blur="$emit('blur', $event)"
    @focus="$emit('focus', $event)"
    @focusin="$emit('focusin', $event)"
    @focusout="$emit('focusout', $event)"
    @click="$emit('click', $event)"
    @change="change"
  >
    <option
      v-for="(option, index) in options"
      :key="`${name}__option--${option.value}`"
      :value="option.value"
    >
      {{ option.label }}
    </option>
  </select>
  <ul v-if="warningsRef.length" class="warnings">
    <li
      v-for="warning in warningsRef"
      :key="warning">
      {{ warning }}
    </li>
  </ul>
</template>

<script lang="ts">
import {computed, defineComponent, Ref, toRef, toRefs, watchEffect} from 'vue';

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
    warnings: {
      type: Object,
      default: () => [],
    },
    props: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ['update:modelValue', 'change', 'blur', 'focus', 'focusin', 'focusout', 'click'],
  setup: (props, { emit, attrs }) => {
    // const propRefs = toRefs(props);
    const isValid = () => {
      return props.valid === undefined ? true : props.valid;
    };

    const value = computed({
      get() {
        return props.modelValue;
      },
      set(value) {
        console.log('value', value);
        emit('update:modelValue', value);
      },
    });

    const change = (e) => {
      emit('change', e);
      emit('blur', e);
    }

    const options = props.props.options;

    return {
      change,
      value,
      options,
      isValid,
      warningsRef: toRef(props, 'warnings'),
    };
  },
});
</script>
