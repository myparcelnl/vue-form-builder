<template>
  <FormGroup v-bind="{label, id, warnings}">
    <input
      :id="id"
      v-model="model"
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
import {PropType, defineComponent} from 'vue';
import FormGroup from './FormGroup.vue';
import {PromiseOr} from '@myparcel/vue-form-builder-utils';
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
      type: [Promise, Boolean] as PropType<PromiseOr<boolean>>,
      default: false,
    },

    valid: {
      type: [Promise, Boolean] as PropType<PromiseOr<boolean>>,
      default: true,
    },

    warnings: {
      type: Array,
    },
  },

  emits: ['update:modelValue', 'change', 'blur', 'focus', 'focusin', 'focusout', 'click'],

  setup: (props) => {
    const isValid = () => {
      return props.valid === undefined ? true : props.valid;
    };

    return {
      model: useVModel(props, 'modelValue'),
      isValid,
    };
  },
});
</script>
