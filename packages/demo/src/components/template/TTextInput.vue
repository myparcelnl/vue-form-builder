<template>
  <FormGroup v-bind="{label, id, warnings}">
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

  </FormGroup>
</template>

<script lang="ts">
import {defineComponent, computed} from 'vue';
import FormGroup from './FormGroup.vue';

export default defineComponent({
  name: 'TTextInput',
  components: {FormGroup},
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

    disabled: {
      type: Boolean,
      default: false,
    },

    valid: {
      type: Boolean,
      default: true,
    },

    warnings: {
      type: Array,
      default: () => [],
    },
  },

  emits: ['update:modelValue', 'change', 'blur', 'focus', 'focusin', 'focusout', 'click'],

  setup: (props, { emit }) => {
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
