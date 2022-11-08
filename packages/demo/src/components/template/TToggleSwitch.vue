<template>
  <FormGroup v-bind="{label, id}">
    <label class="h-6 inline-flex ml-auto relative rounded-full w-10">
      <input
        :id="id"
        v-model="model"
        type="checkbox"
        :name="name"
        :disabled="!disabled"
        class="h-0 opacity-0 peer w-0"
        @blur="$emit('blur', $event)"
        @focus="$emit('focus', $event)"
        @focusin="$emit('focusin', $event)"
        @focusout="$emit('focusout', $event)"
        @click="$emit('click', $event)"
        @change="$emit('change', $event)" />
      <span
        class="absolute before:absolute before:bg-white before:bottom-1 before:content-[''] before:duration-100 before:h-4 before:left-1 before:rounded-full before:w-4 bg-gray-300 bottom-0 cursor-pointer dark:bg-gray-600 dark:peer-checked:bg-pink-600 duration-100 left-0 outline-3 outline-offset-1 peer-checked:before:translate-x-4 peer-checked:bg-pink-500 peer-checked:peer-focus:outline-pink-800 peer-focus:outline peer-focus:outline-gray-500 right-0 rounded-full top-0"></span>
    </label>
  </FormGroup>
</template>

<script lang="ts">
import FormGroup from './FormGroup.vue';
import {defineComponent} from 'vue';
import {useVModel} from '@vueuse/core';

export default defineComponent({
  name: 'TToggleSwitch',
  components: {FormGroup},
  props: {
    // eslint-disable-next-line vue/no-unused-properties
    modelValue: {
      type: Boolean,
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
    },
  },

  emits: ['update:modelValue', 'change', 'blur', 'focus', 'focusin', 'focusout', 'click'],

  setup: (props) => ({
    model: useVModel(props, 'modelValue'),
  }),
});
</script>
