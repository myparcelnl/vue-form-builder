<template>
  <div class="bg-red-700 border border-red-800 col-span-2 dark:bg-red-900 mt-3 p-5 rounded-lg">
    <ul>
      <li
        v-for="error in errors"
        :key="error"
        v-text="error" />
    </ul>
  </div>
</template>

<script lang="ts" setup>
defineProps<{errors: string[]}>();
</script>
