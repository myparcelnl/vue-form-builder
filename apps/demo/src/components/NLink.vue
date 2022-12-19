<template>
  <RouterLink :to="to"><slot></slot></RouterLink>
</template>

<script lang="ts" setup>
import {RouterLink} from 'vue-router';

defineProps({
  to: {
    type: String,
    required: true,
  },
});
</script>
