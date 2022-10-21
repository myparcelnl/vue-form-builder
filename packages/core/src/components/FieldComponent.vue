<template>
  <span
    v-show="field.isVisible"
    :class="field.isVisible ? field.form.config.fieldClass : null">
    <component
      :is="field.component"
      v-if="field.lazy"
      v-model.lazy="/* eslint-disable vue/no-mutating-props */ field.ref"
      v-bind="bindData"
      v-on="hooks" />

    <component
      :is="field.component"
      v-else
      v-model="/* eslint-disable vue/no-mutating-props */ field.ref"
      v-bind="bindData"
      v-on="hooks" />

    <!--    <span class="pointer-events-none relative z-10"> -->
    <!--      <span -->
    <!--        class="absolute bg-pink-200 dark:bg-pink-800 duration-100 group-hover:opacity-100 opacity-0 p-2 right-0 rounded-lg text-xs transition-opacity whitespace-nowrap"> -->
    <!--        name: {{ field.name }} -->
    <!--        <br /> -->
    <!--        value: {{ field.ref }} -->

    <!--        <CodeBlock -->
    <!--          :code="{ -->
    <!--            value: field.ref, -->
    <!--            isDirty: field.isDirty, -->
    <!--            isDisabled: field.isDisabled, -->
    <!--            isOptional: field.isOptional, -->
    <!--            isSuspended: field.isSuspended, -->
    <!--            isTouched: field.isTouched, -->
    <!--            isValid: field.isValid, -->
    <!--            isVisible: field.isVisible, -->
    <!--          }" -->
    <!--          hide-controls /> -->
    <!--      </span> -->
    <!--    </span> -->
  </span>
</template>

<script lang="ts">
import {PropType, computed, defineComponent, toRefs} from 'vue';
import {CodeBlock} from '@myparcel/vue-form-builder-shared';
import {FieldInstance} from '../services';
import {useLifeCycleHooks} from '../composables/useLifeCycleHooks';

export default defineComponent({
  name: 'FieldComponent',
  components: {
    CodeBlock,
  },

  props: {
    field: {
      type: Object as PropType<FieldInstance>,
      required: true,
    },
  },

  setup: (props) => {
    const propRefs = toRefs(props);

    useLifeCycleHooks(props.field.hooks, props.field);

    const hooks = computed(() => {
      return props.field.hooks.registeredHooks.reduce(
        (acc, hook) => {
          if (!hook.name.startsWith('on')) {
            return acc;
          }

          return {
            ...acc,
            [hook.name.replace(/^on/, '')]: (value) => hook.callback(props.field, value),
          };
        },
        {
          blur: props.field.blur,
          focus: props.field.focus,
          click: props.field.click,
        },
      );
    });

    // if (props.field.hooks.has('mounted')) {
    //   onMounted(async () => {
    //     await props.field.hooks.execute('mounted', props.field);
    //   });
    // }

    // onBeforeUpdate(async () => {
    //   await props.field.hooks.execute('beforeUpdate', props.field);
    // });
    //
    // onUpdated(async () => {
    //   await props.field.hooks.execute('updated', props.field);
    // });
    //
    // onActivated(async () => {
    //   await props.field.hooks.execute('activated', props.field);
    // });
    //
    // onDeactivated(async () => {
    //   await props.field.hooks.execute('deactivated', props.field);
    // });
    //
    // onBeforeUnmount(async () => {
    //   await props.field.hooks.execute('beforeUnmount', props.field);
    // });
    //
    // onUnmounted(async () => {
    //   await props.field.hooks.execute('unmounted', props.field);
    // });

    return {
      propRefs,
      hooks,
      bindData: computed(() => {
        return {
          ...(props.field.props ?? {}),
          id: props.field.id ?? props.field.name,
          label: props.field.label,
          name: props.field.name,
          disabled: props.field.isDisabled,
          valid: props.field.isValid,
        };
      }),
    };
  },
});
</script>
