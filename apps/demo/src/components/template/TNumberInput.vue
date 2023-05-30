<template>
  <input
    :id="element.name"
    v-model.number="model"
    type="number"
    :class="{
      'border-red-500': !element.isValid,
      'opacity-50 cursor-not-allowed': element.isDisabled || element.isSuspended,
    }"
    :disabled="element.isDisabled"
    :name="element.name"
    v-bind="element.props"
    @blur="$emit('blur', $event)"
    @change="$emit('change', $event)"
    @click="$emit('click', $event)"
    @focus="$emit('focus', $event)"
    @focusin="$emit('focusin', $event)"
    @focusout="$emit('focusout', $event)" />
</template>

<script lang="ts">
import {type PropType, defineComponent} from 'vue';
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
