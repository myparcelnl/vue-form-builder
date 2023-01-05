<template>
  <input
    :id="element.name"
    v-model="model"
    type="text"
    :name="element.name"
    :disabled="element.isDisabled"
    :class="{
      'border-red-500': element.isValid === false,
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
import {PropType, computed, defineComponent} from 'vue';
import {InteractiveElementInstance} from '../../form';

export default defineComponent({
  name: 'TextInput',
  props: {
    element: {
      type: Object as PropType<InteractiveElementInstance>,
      required: true,
    },

    modelValue: {
      type: String,
      default: null,
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
