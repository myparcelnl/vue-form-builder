<template>
  <button type="submit">Submit</button>
</template>

<script lang="ts">
import {PropType, defineComponent} from 'vue';
import {InteractiveElementInstance} from '../../form';

export default defineComponent({
  name: 'SubmitButton',

  props: {
    // eslint-disable-next-line vue/no-unused-properties
    element: {
      type: Object as PropType<InteractiveElementInstance>,
      required: true,
    },
  },
});
</script>
