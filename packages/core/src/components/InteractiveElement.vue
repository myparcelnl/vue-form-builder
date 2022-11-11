<template>
  <div
    v-show="elementRefs.isVisible"
    :id="elementId()"
    :class="elementRefs.isVisible ? element.form.config.fieldClass : null"
  >
  <component
      :is="element.component"
      v-model="value"
      :id="element.name ?? element.name"
      :label="label"
      :name="element.name"
      :warnings="errors"
      :disabled="isDisabled"
      :valid="isValid"
      :suspended="isSuspended"
      :props="element.props"
      v-on="hooks"
    />
  </div>
</template>

<script lang="ts">
import {PropType, computed, defineComponent, provide, toRefs, toRef} from 'vue';
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
    const elementRefs = toRefs(props.element);

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
        return elementRefs.ref.value;
      },
      set(value) {
        elementRefs.ref.value = value;
      },
    });

    const elementId = (): String => {
      if (elementRefs.name.value) {
        return elementRefs.name.value + '__container';
      }
      return '';
    };

    const label = toRef(props.element, 'label');
    const errors = toRef(props.element, 'errors');
    const isValid = toRef(props.element, 'isValid');
    const isSuspended = toRef(props.element, 'isSuspended');
    const isDisabled = toRef(props.element, 'isDisabled');

    return {
      hooks,
      value,
      label,
      errors,
      isValid,
      isSuspended,
      isDisabled,
      elementId,
      elementRefs,
    };
  },
});
</script>
