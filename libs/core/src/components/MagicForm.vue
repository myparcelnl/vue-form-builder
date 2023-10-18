<template>
  <component
    :is="form.config.form.tag"
    :id="form.name"
    v-bind="form.config.form.attributes"
    ref="formElement"
    @submit.prevent="() => form.submit()"
    @reset.prevent="() => form.reset()">
    <Fragment :component="form.config.form.wrapper">
      <Suspense v-if="$slots.default">
        <template #default>
          <slot />
        </template>

        <template #fallback>
          <slot name="loader" />
        </template>
      </Suspense>

      <RenderedFormContent v-else />
    </Fragment>
  </component>
</template>

<script lang="ts" setup>
import {onMounted, provide, ref, toRefs} from 'vue';
import {get} from '@vueuse/core';
import {type FormInstance} from '../form';
import {FORM_HOOKS, type FormHook, INJECT_FORM} from '../data';
import {useLifecycleHooks} from '../composables';
import RenderedFormContent from './RenderedFormContent.vue';
import Fragment from './Fragment.vue';

const formElement = ref<HTMLFormElement | null>(null);

const props = defineProps<{form: FormInstance}>();
const emit = defineEmits<(event: FormHook, form: FormInstance) => void>();

const propRefs = toRefs(props);

const propsForm = propRefs.form.value;

onMounted(() => {
  const value = get(formElement);

  if (!value) {
    return;
  }

  // eslint-disable-next-line vue/no-mutating-props
  props.form.element = value;
});

provide(INJECT_FORM, propsForm);

FORM_HOOKS.forEach((hook) => {
  props.form.on(hook, (form) => {
    emit(hook, form);
  });
});

const lifeCycleHooks = useLifecycleHooks();

lifeCycleHooks.register(propsForm.hooks, propsForm);
</script>
