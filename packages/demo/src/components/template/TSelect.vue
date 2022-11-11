<template>
  <FormGroup v-bind="{label, id, warnings}">
    <select
      :id="id"
      v-model="model"
      :name="name"
      :disabled="disabled"
      :class="{
        'border-red-500': !isValid(),
      }"
      @blur="$emit('blur', $event)"
      @focus="$emit('focus', $event)"
      @focusin="$emit('focusin', $event)"
      @focusout="$emit('focusout', $event)"
      @click="$emit('click', $event)"
      @change="change">
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
import {defineComponent, toRefs, watchEffect} from 'vue';
import FormGroup from './FormGroup.vue';
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
      default: false,
    },

    valid: {
      type: Boolean,
      default: true,
    },

    warnings: {
      type: Array<String>,
      default: () => [],
    },

    props: {
      type: Object,
      default: () => ({}),
    },
  },

  emits: ['update:modelValue', 'change', 'blur', 'focus', 'focusin', 'focusout', 'click'],

  setup: (props, { emit }) => {
    const model = useVModel(props, 'modelValue');
    const propRefs = toRefs(props);

    const isValid = () => {
      return props.valid.value === undefined ? true : props.valid.value;
    };

    watchEffect(() => {
      if (model.value) {
        return;
      }

      model.value = propRefs.options.value[0]?.value;
    });

    const change = (e) => {
      emit('change', e);
      emit('blur', e);
    }

    const options = props.props.options;

    return {
      model,
      options,
      isValid,
      change,
    };
  },
});
</script>
