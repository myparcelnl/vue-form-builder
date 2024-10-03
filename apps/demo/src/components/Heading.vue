<template>
  <component :is="`h${element.props.level}`">{{ element.props.text }}</component>
</template>

<script lang="ts" setup>
import {type FieldInstance} from '@myparcel/vue-form-builder';

defineProps<{element: FieldInstance}>();
</script>
