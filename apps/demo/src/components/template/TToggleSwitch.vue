<template>
  <label class="h-6 inline-flex ml-auto relative rounded-full w-10">
    <input
      :id="element.name"
      v-model="model"
      class="h-0 opacity-0 peer w-0"
      type="checkbox"
      :disabled="element.isDisabled"
      :name="element.name"
      @blur="$emit('blur', $event)"
      @change="$emit('change', $event)"
      @click="$emit('click', $event)"
      @focus="$emit('focus', $event)"
      @focusin="$emit('focusin', $event)"
      @focusout="$emit('focusout', $event)" />
    <span
      class="absolute before:absolute before:bg-white before:bottom-1 before:content-[''] before:duration-100 before:h-4 before:left-1 before:rounded-full before:w-4 bg-gray-300 bottom-0 cursor-pointer dark:bg-gray-600 dark:peer-checked:bg-pink-600 duration-100 left-0 outline-3 outline-offset-1 peer-checked:before:translate-x-4 peer-checked:bg-pink-500 peer-checked:peer-focus:outline-pink-800 peer-focus:outline peer-focus:outline-gray-500 right-0 rounded-full top-0"
      :class="{'opacity-50 cursor-not-allowed': element.isDisabled}" />
  </label>
</template>

<script lang="ts">
/* eslint-disable vue/no-unused-properties */
import {type PropType, defineComponent} from 'vue';
import {useVModel} from '@vueuse/core';
import {type InteractiveElementInstance} from '@myparcel/vue-form-builder/src';

export default defineComponent({
  name: 'TToggleSwitch',
  props: {
    element: {
      type: Object as PropType<InteractiveElementInstance>,
      required: true,
    },

    // eslint-disable-next-line vue/no-unused-properties
    modelValue: {
      type: Boolean,
    },
  },

  emits: ['update:modelValue', 'change', 'blur', 'focus', 'focusin', 'focusout', 'click'],

  setup: (props) => ({
    model: useVModel(props, 'modelValue'),
  }),
});
</script>
