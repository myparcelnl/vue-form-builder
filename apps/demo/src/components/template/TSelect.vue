<template>
  <select
    :id="element.name"
    v-model="model"
    :name="element.name"
    :disabled="element.isDisabled"
    :class="{
      'border-red-500': !element.isValid,
      'opacity-50 cursor-not-allowed': element.isDisabled || element.isSuspended,
    }"
    @blur="$emit('blur', $event)"
    @change="$emit('change', $event)"
    @click="$emit('click', $event)"
    @focus="$emit('focus', $event)"
    @focusin="$emit('focusin', $event)"
    @focusout="$emit('focusout', $event)">
    <option
      v-for="option in options"
      :key="`${element.name}__option--${option.value}`"
      :value="option.value"
      v-text="option.label"></option>
  </select>
</template>

<script lang="ts">
import {ComputedRef, PropType, computed, defineComponent, watch} from 'vue';
import {InteractiveElementInstance, SelectOption} from '@myparcel/vue-form-builder/src';
import {useVModel} from '@vueuse/core';

export default defineComponent({
  name: 'TSelect',
  props: {
    element: {
      type: Object as PropType<InteractiveElementInstance>,
      required: true,
    },

    // eslint-disable-next-line vue/no-unused-properties
    modelValue: {
      type: String,
      default: null,
    },
  },

  emits: ['update:modelValue', 'change', 'blur', 'focus', 'focusin', 'focusout', 'click'],

  setup: (props) => {
    const model = useVModel(props, 'modelValue');

    const options: ComputedRef<SelectOption[]> = computed(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return props.element.props.options as SelectOption[];
    });

    // Set the model value to the first option if no value is set
    watch(options, () => {
      if (!model.value) {
        model.value = options.value[0].value;
      }
    });

    return {
      model,

      options,
    };
  },
});
</script>
