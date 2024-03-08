<template>
  <input
    :id="element.name"
    v-model="model"
    type="text"
    :name="element.name"
    :disabled="element.isDisabled || element.isSuspended"
    :readonly="element.isReadOnly"
    :class="{
      'border-red-500': !element.isValid,
      'opacity-50 cursor-not-allowed': element.isDisabled,
    }" />
</template>

<script lang="ts" setup generic="Type extends string">
import {useVModel} from '@vueuse/core';
import {type FieldEmits, type FieldProps} from '@myparcel-vfb/core';

// eslint-disable-next-line vue/no-unused-properties
const props = defineProps<FieldProps<Type>>();
const emit = defineEmits<FieldEmits<Type>>();

const model = useVModel(props, undefined, emit);
</script>
