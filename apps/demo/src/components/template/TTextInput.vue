<template>
  <input
    :id="element.name"
    v-model="model"
    type="text"
    :name="element.name"
    :disabled="element.isDisabled"
    :class="{
      'border-red-500': !element.isValid,
      'opacity-50 cursor-not-allowed': element.isDisabled,
    }"
    @blur="$emit('blur', $event)"
    @focus="$emit('focus', $event)"
    @focusin="$emit('focusin', $event)"
    @focusout="$emit('focusout', $event)"
    @click="$emit('click', $event)"
    @change="$emit('change', $event)" />
</template>

<script lang="ts">
import {type PropType, defineComponent} from 'vue';
import {useVModel} from '@vueuse/core';
import {type InteractiveElementInstance} from '@myparcel/vue-form-builder';

export default defineComponent({
  name: 'TTextInput',
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

  emits: ['update:modelValue', 'change', 'blur', 'focus', 'focusin', 'focusout', 'click'],

  setup: (props) => {
    return {
      model: useVModel(props, 'modelValue'),
    };
  },
});
</script>
