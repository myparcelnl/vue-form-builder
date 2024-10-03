<template>
  <input
    :id="element.name"
    v-model.number="model"
    type="number"
    :class="{
      'border-red-500': !element.isValid,
      'opacity-50 cursor-not-allowed': element.isDisabled || element.isSuspended || element.isReadOnly,
    }"
    :disabled="element.isDisabled || element.isSuspended"
    :readonly="element.isReadOnly"
    :name="element.name"
    v-bind="element.props" />
</template>

<script lang="ts" setup generic="Type extends number | string">
import {useVModel} from '@vueuse/core';
import {type FieldEmits, type FieldProps} from '@myparcel/vue-form-builder';

// eslint-disable-next-line vue/no-unused-properties
const props = defineProps<FieldProps<Type>>();
const emit = defineEmits<FieldEmits<number>>();

const model = useVModel(props, undefined, emit);
</script>
