<template>
  <div>
    <h1>Behold, a form</h1>

    <div class="relative">
      <div
        id="bonnetje"
        class="fixed gap-4 grid grid-cols-1 right-4 top-4 w-64 z-50">
        <div
          id="return-shipment"
          class="bg-pink-900 outline outline-2 outline-offset-2 outline-pink-900 p-3 rounded-lg" />
      </div>

      <MagicForm
        :form="shipmentOptionsForm"
        :class="formClasses"
        @afterValidate="afterValidate" />
    </div>

    <p>
      <b>This form is currently {{ dirty ? 'dirty! 🤢' : 'clean! ✨' }}</b>
    </p>

    <pre v-text="values" />

    <div>
      <h3>Form event log</h3>

      <textarea
        v-model="eventLog"
        class="font-mono w-full"
        rows="10"
        readonly />
    </div>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, ref, watch} from 'vue';
import {get} from '@vueuse/core';
import {type FormInstance} from '@myparcel-vfb/core';
import {MagicForm} from '@myparcel/vue-form-builder';
import {shipmentOptionsForm} from '../forms/shipmentOptionsForm';
import {useFormEventLog} from '../composables/useFormEventLog';

export default defineComponent({
  name: 'ShipmentOptionsView',
  components: {
    MagicForm,
  },

  setup: () => {
    const eventLog = useFormEventLog(shipmentOptionsForm);
    const values = computed(() => shipmentOptionsForm.getValues());

    const formClasses = ref<string[]>([]);

    const dirty = computed(() => get(shipmentOptionsForm.isDirty));

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

    return {
      eventLog,

      afterValidate(form: FormInstance) {
        formClasses.value = get(form.isValid) ? ['border-green-500'] : ['border-red-500'];
      },

      formClasses,
      shipmentOptionsForm,
      values,
      dirty,
    };
  },
});
</script>

<style lang="scss" scoped>
#return-shipment {
  float: right;
}
</style>
