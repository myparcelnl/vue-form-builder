<template>
  <component
    :is="element.component"
    :id="element.name ?? element.name"
    :name="element.name"
    :class="element.isVisible ? element.attributes.class : null"
    :label="element.label"
    :errors="element.formattedErrors"
    v-bind="{...element.attributes, ...element.props}"
    v-on="hooks">
    <template
      v-for="(slot, key) in element.slots"
      :key="key">
      <component :is="slot" />
    </template>
  </component>
</template>

<script lang="ts">
import {PropType, computed, defineComponent, provide} from 'vue';
import {INJECT_ELEMENT} from '../services';
import {PlainElementInstance} from '../form';
import {useLifeCycleHooks} from '../composables';

export default defineComponent({
  name: 'PlainElement',
  props: {
    element: {
      type: Object as PropType<PlainElementInstance>,
      required: true,
    },
  },

  setup: (props) => {
    provide(INJECT_ELEMENT, props.element);
    const lifecycleHooks = useLifeCycleHooks();
    lifecycleHooks.register(props.element.hooks, props.element);

    return {
      hooks: computed(() => {
        const registeredHooks = props.element.hooks.getRegisteredHooks();

        return registeredHooks.reduce(
          (acc, hook) => ({
            ...acc,
            [hook.name]: hook.callback,
          }),
          {
            click: props.element.click,
          },
        );
      }),
    };
  },
});
</script>
