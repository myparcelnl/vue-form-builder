<template>
  <select
    :id="element.name"
    v-model="model"
    :name="element.name"
    :disabled="element.isDisabled || element.isSuspended || element.isReadOnly"
    :class="{
      'border-red-500': !element.isValid,
      'opacity-50 cursor-not-allowed': element.isDisabled || element.isSuspended || element.isReadOnly,
    }">
    <option
      v-for="option in options"
      :key="`${element.name}__option--${option.value}`"
      :value="option.value"
      v-text="option.label" />
  </select>
</template>

<script lang="ts" setup generic="Type extends string">
/* eslint-disable @typescript-eslint/no-unnecessary-type-arguments */
import {type ComputedRef, computed, watch, onUnmounted} from 'vue';
import {useVModel} from '@vueuse/core';
import {type FieldEmits, type FieldProps} from '@myparcel/vue-form-builder';
import {type SelectOption} from '@myparcel/vue-form-builder';

// eslint-disable-next-line vue/no-unused-properties
const props = defineProps<FieldProps<Type>>();
const emit = defineEmits<FieldEmits<Type>>();

const model = useVModel(props, undefined, emit);

const options: ComputedRef<SelectOption<Type>[]> = computed(() => {
  return props.element.props.options as SelectOption<Type>[];
});

// Set the model value to the first option if no value is set
onUnmounted(
  watch(options, () => {
    if (!model.value) {
      model.value = options.value[0].value;
    }
  }),
);
</script>
