<template>
  <component
    :is="form.config.form.tag"
    :id="form.name"
    ref="formElement"
    v-bind="form.config.form.attributes"
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

<script generic="V extends FormValues = FormValues" lang="ts" setup>
import {onMounted, provide, ref, toRefs, toValue} from 'vue';
import {type FormInstance, type FormValues, type FormHooks} from '../types';
import {INJECT_FORM} from '../symbols';
import {FORM_HOOKS, type FormHook} from '../data';
import {useLifecycleHooks} from '../composables';
import RenderedFormContent from './RenderedFormContent.vue';
import Fragment from './Fragment.vue';

const formElement = ref<HTMLFormElement | null>(null);

const props = defineProps<{form: FormInstance<V>}>();
const emit = defineEmits<(event: FormHook, form: FormInstance<V>) => void>();

const propRefs = toRefs(props);

const propsForm = propRefs.form.value;

onMounted(() => {
  const value = toValue(formElement);

  if (!value) {
    return;
  }

  // eslint-disable-next-line vue/no-mutating-props
  props.form.element = value;
});

provide(INJECT_FORM, propsForm);

FORM_HOOKS.forEach((hook) => {
  props.form.on(hook as keyof FormHooks, (form) => {
    emit(hook, form);
  });
});

const lifeCycleHooks = useLifecycleHooks();

lifeCycleHooks.register(propsForm.hooks, propsForm);
</script>
