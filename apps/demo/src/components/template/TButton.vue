<template>
  <button
    type="button"
    class="inline-flex mt-2 px-5 py-3 rounded-full"
    :disabled="disabled || loading"
    :class="{
      'opacity-50 cursor-not-allowed': loading,
      'cursor-wait': loading,
      'hover:bg-pink-700': !outline && !disabled && !loading,
      'hover:bg-pink-600': outline && !disabled,
      'bg-pink-600 text-gray-900': !outline,
      'border border-pink-600 hover:bg-pink-600 hover:text-white text:pink-600': outline,
    }">
    <LoadingOverlay v-if="loading" />

    <slot name="icon" />

    <slot />
  </button>
</template>

<script lang="ts" setup>
import LoadingOverlay from '../LoadingOverlay.vue';

defineProps<{
  loading?: boolean;
  disabled?: boolean;
  outline?: boolean;
}>();
</script>
