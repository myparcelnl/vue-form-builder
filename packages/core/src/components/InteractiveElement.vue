<template>
  <div
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
  </div>
</template>

<script lang="ts">
import {PropType, computed, defineComponent, provide, toRefs} from 'vue';
import {INJECT_ELEMENT} from '../services';
import {InteractiveElementInstance} from '../../../form-builder/src';
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

    const propRefs = toRefs(props);

    lifecycleHooks.register(propRefs.element.value.hooks, propRefs.element);

    const hooks = computed(() => {
      return props.element.hooks.registeredHooks.reduce(
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
        // TODO: fix types
        {
          blur: props.element.blur,
          focus: props.element.focus,
          click: props.element.click,
        },
      );
    });

    return {
      propRefs,
      hooks,
      bindData: computed(() => {
        return {
          ...(props.element.props ?? {}),
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
