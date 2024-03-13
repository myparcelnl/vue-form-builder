<template>
  <div>
    <p>My element is called "{{ element?.name }}"</p>

    <p>I only have a modelValue prop, which is bound to the v-model of the input below.</p>

    <input
      v-model="model"
      type="text" />
  </div>
</template>

<script setup lang="ts">
import {useVModel} from '@vueuse/core';
import {useElement} from '@myparcel/vue-form-builder';

// eslint-disable-next-line vue/no-unused-properties
const props = defineProps<{modelValue: string}>();
const emit = defineEmits<(event: 'update:modelValue', value: string) => void>();

const model = useVModel(props, undefined, emit);

const element = useElement();
</script>
