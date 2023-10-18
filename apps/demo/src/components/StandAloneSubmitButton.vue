<template>
  <TSubmitButton
    v-if="element"
    :element="element"
    :class="{
      'bg-white border border-blue-500 hover:bg-blue-500 hover:text-white hover:border-transparent hover:font-bold hover:skew-x-12 mt-2 p-3 text-blue-500 transition-all':
        outline,
    }"
    @click="() => form?.submit()">
  </TSubmitButton>
</template>

<script lang="ts" setup>
import {inject} from 'vue';
import {INJECT_ELEMENT, INJECT_FORM} from '@myparcel-vfb/core';
import TSubmitButton from './template/TSubmitButton.vue';

defineProps<{outline?: boolean}>();

const form = inject(INJECT_FORM);
const element = inject(INJECT_ELEMENT);
</script>
