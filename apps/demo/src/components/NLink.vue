<template>
  <RouterLink :to="to">
    <slot />
  </RouterLink>
</template>

<script lang="ts" setup>
import {RouterLink} from 'vue-router';

defineProps<{to: string}>();
</script>
