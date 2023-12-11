<template>
  <div class="auto-cols-auto gap-4 grid grid-flow-col">
    <label>I'm <code v-text="element.name" />'s form group.</label>

    <div>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import {useElement} from '@myparcel/vue-form-builder/ts';

const element = useElement();
</script>
