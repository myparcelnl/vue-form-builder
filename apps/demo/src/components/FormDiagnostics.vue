<template>
  <div class="bg-opacity-5 bg-white mt-4 px-8 py-4 rounded-lg">
    <div class="auto-rows-auto gap-2 grid grid-cols-[1fr_3fr] grid-flow-row">
      <b>Name</b>
      <span v-text="form.name"></span>

      <b>isDirty</b>
      <span v-text="form.isDirty" />

      <b>isValid</b>
      <span v-text="form.isValid" />

      <b>values</b>
      <pre v-text="form.values" />

      <b>Event log</b>
      <textarea
        v-model="eventLog"
        class="font-mono w-full"
        readonly
        rows="10" />
    </div>
  </div>
</template>

<script generic="V extends FormValues" lang="ts" setup>
import {toRefs} from 'vue';
import {type MaybeUnwrapNestedRefs, type FormValues} from '@myparcel-vfb/core';
import {type FormInstance} from '@myparcel/vue-form-builder';
import {useFormEventLog} from '../composables/useFormEventLog';

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-arguments
const props = defineProps<{form: MaybeUnwrapNestedRefs<FormInstance<V>>}>();
const propRefs = toRefs(props);

const eventLog = useFormEventLog(propRefs.form.value);
</script>
