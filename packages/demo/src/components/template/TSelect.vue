<template>
  <FormGroup v-bind="{label, id}">
    <select
      :id="id"
      v-model="model"
      :name="name"
      type="hidden"
      :disabled="disabled"
      @blur="$emit('blur', $event)"
      @focus="$emit('focus', $event)"
      @focusin="$emit('focusin', $event)"
      @focusout="$emit('focusout', $event)"
      @click="$emit('click', $event)"
      @change="$emit('change', $event)">
      <option
        v-for="(option, index) in options"
        :key="`${name}__option--${option.value}`"
        :value="option.value">
        {{ option.label }}
      </option>
    </select>
  </FormGroup>
</template>

<script lang="ts">
import {PropType, defineComponent, toRefs, watchEffect} from 'vue';
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

    disabled: {
      type: Boolean,
    },

    options: {
      type: Array as PropType<SelectOption[]>,
      default: () => [],
    },
  },

  emits: ['update:modelValue', 'change', 'blur', 'focus', 'focusin', 'focusout', 'click'],

  setup: (props) => {
    const model = useVModel(props, 'modelValue');
    const propRefs = toRefs(props);

    watchEffect(() => {
      if (model.value) {
        return;
      }

      model.value = propRefs.options.value[0]?.value;
    });

    return {
      model,
    };
  },
});
</script>
