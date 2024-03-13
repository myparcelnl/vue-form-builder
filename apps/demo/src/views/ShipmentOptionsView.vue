<template>
  <div>
    <div class="relative">
      <div
        id="bonnetje"
        class="fixed gap-4 grid grid-cols-1 right-4 top-4 w-64 z-50">
        <div
          id="return-shipment"
          class="bg-pink-900 float-right outline outline-2 outline-offset-2 outline-pink-900 p-3 rounded-lg" />
      </div>

      <MagicForm
        :form="shipmentOptionsForm"
        :class="formClasses"
        @afterValidate="afterValidate" />
    </div>

    <FormDiagnostics :form="shipmentOptionsForm" />
  </div>
</template>

<script lang="ts" setup>
import {computed, ref, watch, toValue} from 'vue';
import {type FormInstance} from '@myparcel-vfb/core';
import {MagicForm} from '@myparcel/vue-form-builder';
import {shipmentOptionsForm} from '../forms/shipmentOptionsForm';
import FormDiagnostics from '../components/FormDiagnostics.vue';

const formClasses = ref<string[]>([]);

const dirty = computed(() => toValue(shipmentOptionsForm.isDirty));

// Ask an user to confirm leaving the page when the form is dirty
// TODO: Should this be a built-in option?
watch(dirty, (isDirty) => {
  window.onbeforeunload = isDirty
    ? () => {
        // eslint-disable-next-line no-console
        console.warn('Form is dirty:', shipmentOptionsForm.getValues());
        // Change to true to enable the warning
        return null;
      }
    : null;
});

const afterValidate = (form: FormInstance) => {
  formClasses.value = toValue(form.isValid) ? ['border-green-500'] : ['border-red-500'];
};
</script>
