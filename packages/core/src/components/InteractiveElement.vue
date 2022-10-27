<template>
  <span
    v-show="element.isVisible"
    :class="element.isVisible ? element.form.config.fieldClass : null">
    <component
      :is="element.component"
      v-if="element.lazy"
      v-model.lazy="/* eslint-disable vue/no-mutating-props */ element.ref"
      v-bind="bindData"
      v-on="hooks" />

    <component
      :is="element.component"
      v-else
      v-model="/* eslint-disable vue/no-mutating-props */ element.ref"
      v-bind="bindData"
      v-on="hooks" />
  </span>
</template>

<script lang="ts">
import {PropType, computed, defineComponent, provide, toRefs} from 'vue';
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
    provide(INJECT_ELEMENT, props.element);

    const propRefs = toRefs(props);

    // TODO: fix types
    useLifeCycleHooks(props.element.hooks as any, props.element);

    const hooks = computed(() => {
      return props.element.hooks.registeredHooks.reduce(
        (acc, hook) => {
          if (!hook.name.startsWith('on')) {
            return acc;
          }

          return {
            ...acc,
            // todo: fix types
            [hook.name.replace(/^on/, '')]: (value: any) => hook.callback(props.element, value),
          };
        },
        // TODO: fix types
        {
          blur: (props.element as any).blur,
          focus: (props.element as any).focus,
          click: (props.element as any).click,
        },
      );
    });

    return {
      propRefs,
      hooks,
      bindData: computed(() => {
        return {
          ...((props.element as any).props ?? {}),
          id: props.element.name ?? props.element.name,
          label: props.element.label,
          name: props.element.name,
          disabled: props.element.isDisabled,
          valid: props.element.isValid,
          warnings: props.element.errors,
        };
      }),
    };
  },
});
</script>
