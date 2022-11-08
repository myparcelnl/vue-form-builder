<template>
  <div
    v-show="element.isVisible.value"
    :class="element.isVisible.value ? element.form.config.fieldClass : null"
  >
    <component
      :is="element.component"
      v-model="value"
      :id="element.name ?? element.name"
      :label="element.label"
      :name="element.name"
      :warnings="element.errors.value"
      :disabled="element.isDisabled.value"
      :valid="element.isValid.value"
      :props="element.props"
      v-on="hooks"
    />
  </div>
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

    const value = computed({
      get() {
        return props.element.ref.value;
      },
      set(value) {
        props.element.ref.value = value;
      },
    });


    return {
      hooks,
      value,
    };
  },
});
</script>
