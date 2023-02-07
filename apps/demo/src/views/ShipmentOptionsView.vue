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

      <MagicForm :form="shipmentOptionsForm" />
    </div>

    <pre v-text="values" />
  </div>
</template>

<script lang="ts">
import {computed, defineComponent} from 'vue';
import {MagicForm} from '@myparcel/vue-form-builder/src';
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

    return {
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
