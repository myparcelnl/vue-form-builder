<template>
  <component
    :is="element.component"
    :id="element.name"
    v-model="model"
    :class="element.isVisible ? element.attributes.class : null"
    :label="element.label"
    :name="element.name"
    :errors="element.formattedErrors"
    :disabled="element.isDisabled"
    :valid="element.isValid"
    :suspended="element.isSuspended"
    v-bind="{...element.attributes, ...element.props}"
    v-on="hooks" />
</template>

<script lang="ts">
import {PropType, computed, defineComponent, provide} from 'vue';
import {INJECT_ELEMENT} from '../services';
import {InteractiveElementInstance} from '../form';
import {useLifeCycleHooks} from '../composables';

export default defineComponent({
  name: 'InteractiveElement',
  props: {
    element: {
      type: Object as PropType<InteractiveElementInstance>,
      required: true,
    },
  },

  setup: (props) => {
    const lifecycleHooks = useLifeCycleHooks();
    provide(INJECT_ELEMENT, props.element);

    lifecycleHooks.register(props.element.hooks, props.element);

    const hooks = computed(() => {
      const registeredHooks = props.element.hooks.getRegisteredHooks();

      return registeredHooks.reduce(
        (acc, hook) => {
          if (!hook.name.startsWith('on')) {
            return acc;
          }

          return {
            ...acc,
            // todo: fix types
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            [hook.name.replace(/^on/, '')]: (value: any) => hook.callback(props.element, value),
          };
        },
        {
          blur: props.element.blur,
          focus: props.element.focus,
          click: props.element.click,
        },
      );
    });

    return {
      hooks,
      model: computed({
        get() {
          return props.element.ref;
        },
        set(value) {
          // eslint-disable-next-line vue/no-mutating-props
          props.element.ref = value;
        },
      }),
    };
  },
});
</script>
