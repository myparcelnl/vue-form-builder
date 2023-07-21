<template>
  <TSubmitButton
    :element="element"
    @click="() => element.form.submit()">
  </TSubmitButton>
</template>

<script lang="ts" setup>
import {type PlainElementInstance} from '@myparcel/vue-form-builder';
import TSubmitButton from './template/TSubmitButton.vue';

defineProps<{element: PlainElementInstance}>();
</script>
