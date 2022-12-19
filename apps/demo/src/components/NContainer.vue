<template>
  <div class="m-auto max-w-screen-xl px-6 w-full">
    <slot />
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'NContainer',
});
</script>
