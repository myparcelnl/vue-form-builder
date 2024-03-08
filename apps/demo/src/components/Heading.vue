<template>
  <component :is="`h${element.props.level}`">{{ element.props.text }}</component>
</template>

<script lang="ts" setup>
import {type FieldInstance} from '@myparcel-vfb/core';

defineProps<{element: FieldInstance}>();
</script>
