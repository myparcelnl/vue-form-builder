<template>
  <label class="h-6 inline-flex ml-auto relative rounded-full w-10">
    <input
      :id="element.name"
      v-model="model"
      class="peer sr-only"
      type="checkbox"
      :disabled="element.isDisabled || element.isSuspended || element.isReadOnly"
      :readonly="element.isReadOnly"
      :name="element.name" />
    <span
      class="absolute before:absolute before:bg-white before:bottom-1 before:content-[''] before:duration-100 before:h-4 before:left-1 before:rounded-full before:w-4 bg-gray-300 bottom-0 cursor-pointer dark:bg-gray-600 dark:peer-checked:bg-pink-600 duration-100 left-0 outline-3 outline-offset-1 peer-checked:before:translate-x-4 peer-checked:bg-pink-500 peer-checked:peer-focus:outline-pink-800 peer-focus:outline peer-focus:outline-gray-500 right-0 rounded-full top-0"
      :class="{
        'opacity-50 cursor-not-allowed': element.isDisabled || element.isSuspended || element.isReadOnly,
      }" />
  </label>
</template>

<script lang="ts" setup generic="Type extends boolean">
import {useVModel} from '@vueuse/core';
import {type FieldEmits, type FieldProps} from '@myparcel-vfb/core';

// eslint-disable-next-line vue/no-unused-properties
const props = defineProps<FieldProps<Type>>();
const emit = defineEmits<FieldEmits<Type>>();

const model = useVModel(props, undefined, emit);
</script>
