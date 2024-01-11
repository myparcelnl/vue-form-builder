<template>
  <TSubmitButton
    v-if="element"
    :element="element"
    :outline="outline">
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
import {useElement, type PlainElementInstance} from '@myparcel-vfb/core';
import TSubmitButton from './template/TSubmitButton.vue';

defineProps<{outline?: boolean}>();

const element = useElement<PlainElementInstance>();
</script>
