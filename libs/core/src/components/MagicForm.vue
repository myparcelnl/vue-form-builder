<template>
  <component
    :is="form.config.form.tag"
    :id="form.name"
    v-bind="form.config.form.attributes"
    ref="formElement"
    @submit.prevent="() => form.submit()"
    @reset.prevent="() => form.reset()">
    <Fragment :component="form.config.form.wrapper">
      <Suspense @resolve="elementsAreResolved = true">
        <template
          v-for="(element, index) in plainFields"
          :key="`element--${element.name ?? 'unnamed'}--${index}`">
          <FormElementWrapper
            :form="form"
            :element="element" />
        </template>
      </Suspense>

      <template v-if="elementsAreResolved">
        <template
          v-for="(element, index) in teleportFields"
          :key="`element--${element.name ?? 'unnamed'}--${index}`">
          <FormElementWrapper
            :form="form"
            :element="element" />
        </template>
      </template>
    </Fragment>
  </component>
</template>

<script lang="ts">
import {FORM_HOOKS, FormHook, FormInstance} from '../form';
import {PropType, computed, defineComponent, onMounted, provide, ref} from 'vue';
import FormElementWrapper from './FormElementWrapper';
import Fragment from './Fragment.vue';
import {INJECT_FORM} from '../services';
import {get} from '@vueuse/core';
import {useLifecycleHooks} from '../composables';

export default defineComponent({
  name: 'MagicForm',
  components: {
    Fragment,
    FormElementWrapper,
  },

  props: {
    form: {
      type: Object as PropType<FormInstance>,
      required: true,
    },
  },

  emits: FORM_HOOKS as FormHook[],

  setup: (props, ctx) => {
    const formElement = ref<HTMLFormElement | null>(null);

    onMounted(() => {
      const value = get(formElement);

      if (!value) {
        return;
      }

      // eslint-disable-next-line vue/no-mutating-props
      props.form.element = value;
    });

    provide(INJECT_FORM, props.form);

    const elementsAreResolved = ref(false);

    FORM_HOOKS.forEach((hook) => {
      props.form.on(hook, (form) => {
        ctx.emit(hook, form);
      });
    });

    const lifeCycleHooks = useLifecycleHooks();

    lifeCycleHooks.register(props.form.hooks, props.form);

    return {
      formElement,
      elementsAreResolved,
      plainFields: computed(() => get(props.form.fields).filter((element) => !element.teleportSelector)),
      teleportFields: computed(() => get(props.form.fields).filter((element) => Boolean(element.teleportSelector))),
    };
  },
});
</script>
