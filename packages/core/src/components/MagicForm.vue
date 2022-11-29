<template>
  <form
    :id="form.name"
    :class="[
      form.config.formClass,
      {
        valid: form.isValid,
        invalid: !form.isValid,
      },
    ]"
    @submit.prevent="form.submit">
    <Suspense @resolve="fieldsAreResolved = true">
      <template
        v-for="(field, index) in plainFields"
        :key="`field--${field.name ?? 'unnamed'}--${index}`">
        <FormElement :field="field" />
      </template>
    </Suspense>
    <template v-if="fieldsAreResolved">
      <template
        v-for="(field, index) in teleportFields"
        :key="`field--${field.name ?? 'unnamed'}--${index}`">
        <FormElement :field="field" />
      </template>
    </template>
  </form>
</template>

<script lang="ts">
import {PropType, computed, defineComponent, provide, ref, toRefs} from 'vue';
import FormElement from './FormElement.vue';
import {FormInstance} from '../form';
import {INJECT_FORM} from '../services';
import {useLifeCycleHooks} from '../composables';

export default defineComponent({
  name: 'MagicForm',
  components: {
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

    const propRefs = toRefs(props);
    const fieldsAreResolved = ref(false);
    const lifeCycleHooks = useLifeCycleHooks();

    lifeCycleHooks.register(props.form.hooks, props.form);

    const {fields} = propRefs.form.value;

    return {
      fields,
      fieldsAreResolved,
      // todo: (fields.value ?? fields) is a hack to make the tests and the actual code work.
      plainFields: computed(() => (fields.value ?? fields).filter((field) => !field.teleportSelector)),
      teleportFields: computed(() => (fields.value ?? fields).filter((field) => Boolean(field.teleportSelector))),
    };
  },
});
</script>
