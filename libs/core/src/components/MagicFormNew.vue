<template>
  <component
    :is="form.config.form.tag"
    :id="form.name"
    v-bind="form.config.form.attributes"
    ref="formElement"
    @submit.prevent="() => form.submit()"
    @reset.prevent="() => form.reset()">
    <Fragment :component="form.config.form.wrapper">
      <Suspense>
        <template #default>
          <slot />
        </template>

        <template #fallback>
          <slot name="loader" />
        </template>
      </Suspense>
    </Fragment>
  </component>
</template>

<script lang="ts" setup>
import {onMounted, provide, ref} from 'vue';
import {get} from '@vueuse/core';
import {INJECT_FORM} from '../services';
import {FORM_HOOKS, type FormHook, type FormInstance} from '../form';
import {useLifecycleHooks} from '../composables';
import Fragment from './Fragment.vue';

const formElement = ref<HTMLFormElement | null>(null);

const props = defineProps<{
  form: FormInstance;
}>();

const emit = defineEmits<(event: FormHook, form: FormInstance) => void>();

onMounted(() => {
  const value = get(formElement);

  if (!value) {
    return;
  }

  // eslint-disable-next-line vue/no-mutating-props
  props.form.element = value;
});

provide(INJECT_FORM, props.form);

FORM_HOOKS.forEach((hook) => {
  props.form.on(hook, (form) => {
    emit(hook, form);
  });
});

const lifeCycleHooks = useLifecycleHooks();

lifeCycleHooks.register(props.form.hooks, props.form);
</script>
