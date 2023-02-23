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

    <pre v-text="values" />
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, ref} from 'vue';
import {FormInstance} from '@myparcel-vfb/core';
import {MagicForm} from '@myparcel/vue-form-builder/src';
import {get} from '@vueuse/core';
import {shipmentOptionsForm} from '../forms/shipmentOptionsForm';

export default defineComponent({
  name: 'ShipmentOptionsView',
  components: {
    MagicForm,
  },

  setup: () => {
    const values = computed(() => {
      return shipmentOptionsForm.getValues();
    });

    const formClasses = ref<string[]>([]);

    return {
      afterValidate(form: FormInstance) {
        formClasses.value = get(form.isValid) ? ['border-green-500'] : ['border-red-500'];
      },

      formClasses,
      shipmentOptionsForm,
      values,
    };
  },
});
</script>

<style lang="scss" scoped>
#return-shipment {
  float: right;
}
</style>
