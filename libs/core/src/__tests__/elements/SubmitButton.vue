<template>
  <button type="submit">Submit</button>
</template>

<script lang="ts" setup>
import {type FieldInstance} from '../../types';

// eslint-disable-next-line vue/no-unused-properties
defineProps<{element: FieldInstance}>();
</script>
