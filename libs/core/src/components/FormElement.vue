<template>
  <component
    :is="form?.config?.formElementWrapper ?? 'template'"
    :class="form?.config?.formElementWrapperClass">
    <template v-if="field.teleportSelector">
      <Teleport :to="field.teleportSelector">
        <InteractiveElement
          v-show="field.isVisible"
          v-if="field.hasOwnProperty('ref')"
          :element="field" />
        <PlainElement
          v-else
          v-show="field.isVisible"
          :element="field" />
      </Teleport>
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
  </component>
</template>

<script lang="ts">
import {PropType, defineComponent, inject} from 'vue';
import {AnyElementInstance} from '../types';
import {INJECT_FORM} from '../services';
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

  setup: () => {
    const form = inject(INJECT_FORM);

    return {
      form,
    };
  },
});
</script>
