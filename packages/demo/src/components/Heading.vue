<template>
  <component :is="`h${level}`">{{ text }}</component>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'Heading',
  props: {
    level: {
      type: Number,
      required: true,
    },

    text: {
      type: String,
      required: true,
    },
  },
});
</script>
