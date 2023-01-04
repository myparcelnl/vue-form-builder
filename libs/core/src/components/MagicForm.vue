<template>
  <component
    :is="form.config.form.tag"
    :id="form.name"
    v-bind="form.config.form.attributes"
    :class="{
      valid: form.isValid,
      invalid: !form.isValid,
    }"
    @submit.prevent="handleSubmit">
    <Fragment :component="form.config.form.wrapper">
      <Suspense @resolve="elementsAreResolved = true">
        <template
          v-for="(element, index) in plainFields"
          :key="`element--${element.name ?? 'unnamed'}--${index}`">
          <FormElement
            :form="form"
            :element="element" />
        </template>
      </Suspense>

      <template v-if="elementsAreResolved">
        <template
          v-for="(element, index) in teleportFields"
          :key="`element--${element.name ?? 'unnamed'}--${index}`">
          <FormElement
            :form="form"
            :element="element" />
        </template>
      </template>
    </Fragment>
  </component>
</template>

<script lang="ts">
import {PropType, computed, defineComponent, provide, ref} from 'vue';
import {AnyElementInstance} from '../types';
import FormElement from './FormElement';
import {FormInstance} from '../form';
import Fragment from './Fragment.vue';
import {INJECT_FORM} from '../services';
import {useLifeCycleHooks} from '../composables';

export default defineComponent({
  name: 'MagicForm',
  components: {
    Fragment,
    FormElement,
  },

  props: {
    form: {
      type: Object as PropType<FormInstance>,
      required: true,
    },
  },

  setup: (props) => {
    provide(INJECT_FORM, props.form);

    const elementsAreResolved = ref(false);
    const lifeCycleHooks = useLifeCycleHooks();

    lifeCycleHooks.register(props.form.hooks, props.form);

    const fields = computed(() => {
      return (props.form.fields.value ?? props.form.fields) as unknown as AnyElementInstance[];
    });

    return {
      fields,
      elementsAreResolved,
      // todo: (elements.value ?? elements) is a hack to make the tests and the actual code work.
      plainFields: computed(() => fields.value.filter((element) => !element.teleportSelector)),
      teleportFields: computed(() => fields.value.filter((element) => Boolean(element.teleportSelector))),

      async handleSubmit() {
        await props.form.submit();
      },
    };
  },
});
</script>
