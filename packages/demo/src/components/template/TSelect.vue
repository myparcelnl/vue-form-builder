<template>
  <FormGroup v-bind="{label, id, warnings}">
    <select
      :id="id"
      v-model="model"
      :name="name"
      :disabled="disabled"
      :class="{
        'border-red-500': valid === false,
        'opacity-50 cursor-not-allowed': disabled,
      }"
      @blur="$emit('blur', $event)"
      @change="$emit('change', $event)"
      @click="$emit('click', $event)"
      @focus="$emit('focus', $event)"
      @focusin="$emit('focusin', $event)"
      @focusout="$emit('focusout', $event)">
      <option
        v-for="option in options"
        :key="`${name}__option--${option.value}`"
        :value="option.value"
        v-text="option.label"></option>
    </select>
  </FormGroup>
</template>

<script lang="ts">
/* eslint-disable vue/no-unused-properties */
import {PropType, defineComponent, toRefs, watch} from 'vue';
import FormGroup from './FormGroup.vue';
import {SelectOption} from '@myparcel/vue-form-builder';
import {useVModel} from '@vueuse/core';

export default defineComponent({
  name: 'TSelect',
  components: {FormGroup},
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

    warnings: {
      type: Object,
      default: () => ({}),
    },

    options: {
      type: Array as PropType<SelectOption[]>,
      default: () => [],
    },

    disabled: {
      type: Boolean,
    },

    suspended: {
      type: Boolean,
    },

    valid: {
      type: Boolean,
    },
  },

  emits: ['update:modelValue', 'change', 'blur', 'focus', 'focusin', 'focusout', 'click'],

  setup: (props) => {
    const model = useVModel(props, 'modelValue');
    const propRefs = toRefs(props);

    // Set the model value to the first option if no value is set
    watch(
      propRefs.options,
      (options) => {
        if (model.value) {
          return;
        }

        model.value = options[0]?.value;
      },
      {immediate: true},
    );

    return {
      model,
    };
  },
});
</script>
