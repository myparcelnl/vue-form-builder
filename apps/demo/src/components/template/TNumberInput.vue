<template>
  <input
    :id="element.name"
    v-model.number="model"
    type="number"
    :class="{
      'border-red-500': !element.isValid,
      'opacity-50 cursor-not-allowed': element.isDisabled || element.isSuspended || element.isReadOnly,
    }"
    :disabled="element.isDisabled || element.isSuspended"
    :readonly="element.isReadOnly"
    :name="element.name"
    v-bind="element.props" />
</template>

<script lang="ts">
import {defineComponent, type PropType} from 'vue';
import {useVModel} from '@vueuse/core';
import {type InteractiveElementInstance} from '@myparcel/vue-form-builder';

export default defineComponent({
  name: 'TNumberInput',
  props: {
    element: {
      type: Object as PropType<InteractiveElementInstance>,
      required: true,
    },

    // eslint-disable-next-line vue/no-unused-properties
    modelValue: {
      type: [String, Number],
      default: null,
    },
  },

  emits: ['update:modelValue', 'blur', 'focus', 'focusin', 'focusout', 'click', 'change'],

  setup: (props) => {
    return {
      model: useVModel(props, 'modelValue'),
    };
  },
});
</script>
