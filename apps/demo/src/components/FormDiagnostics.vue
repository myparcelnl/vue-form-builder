<template>
  <div class="bg-opacity-5 bg-white mt-4 px-8 py-4 rounded-lg">
    <div class="auto-rows-auto gap-2 grid grid-cols-[1fr_3fr] grid-flow-row">
      <b>Name</b>
      <span v-text="form.name"></span>

      <b>isDirty</b>
      <span v-text="form.isDirty" />

      <b>isValid</b>
      <span v-text="form.isValid" />

      <b>getValues()</b>
      <pre v-text="values" />

      <b>Event log</b>
      <textarea
        v-model="eventLog"
        class="font-mono w-full"
        rows="10"
        readonly />
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, toRefs} from 'vue';
import {type MaybeUnwrapNestedRefs} from '@myparcel-vfb/core';
import {type FormInstance} from '@myparcel/vue-form-builder';
import {useFormEventLog} from '../composables/useFormEventLog';

const props = defineProps<{form: MaybeUnwrapNestedRefs<FormInstance>}>();
const propRefs = toRefs(props);

const eventLog = useFormEventLog(propRefs.form.value);
const values = computed(() => props.form.getValues());
</script>
