<template>
  <template v-if="field.teleportSelector">
    <SafeTeleport :to="field.teleportSelector">
      <InteractiveElement
        v-show="field.isVisible"
        v-if="field.hasOwnProperty('ref')"
        :element="field" />
      <PlainElement
        v-else
        v-show="field.isVisible"
        :element="field" />
    </SafeTeleport>
  </template>
  <template v-else>
    <InteractiveElement
      v-show="field.isVisible"
      v-if="field.hasOwnProperty('ref')"
      :element="field" />
    <PlainElement
      v-else
      v-show="field.isVisible"
      :element="field" />
  </template>
</template>

<script lang="ts">
import {PropType, defineComponent} from 'vue';
import {AnyElementInstance} from '../types';
import InteractiveElement from './InteractiveElement.vue';
import PlainElement from './PlainElement.vue';

export default defineComponent({
  name: 'FormElement',
  components: {InteractiveElement, PlainElement},
  props: {
    field: {
      type: Object as PropType<AnyElementInstance>,
      required: true,
    },
  },
});
</script>
