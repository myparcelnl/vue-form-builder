<template>
  <component :is="`h${element.props.level}`">{{ element.props.text }}</component>
</template>

<script lang="ts">
import {type PropType, defineComponent} from 'vue';
import {type InteractiveElementInstance} from '@myparcel-dev/vue-form-builder';

export default defineComponent({
  name: 'Heading',
  props: {
    element: {
      type: Object as PropType<InteractiveElementInstance>,
      required: true,
    },
  },
});
</script>
