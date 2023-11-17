<template>
  <TSubmitButton
    v-if="element"
    :element="element"
    :outline="outline"
    @click="() => form?.submit()">
    <template
      v-for="name in Object.keys($slots)"
      :key="name"
      #[name]="scope">
      <slot
        :name="name"
        v-bind="scope || {}" />
    </template>
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
