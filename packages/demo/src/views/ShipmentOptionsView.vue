<template>
  <h1>Behold, a form</h1>
  <div id="return-shipment"></div>
  <MagicForm :form="shipmentOptionsForm" />

  <pre v-text="values" />
</template>

<script lang="ts">
import {computed, defineComponent} from 'vue';
import {MagicForm} from '@myparcel/vue-form-builder';
import {shipmentOptionsForm} from '../forms/shipmentOptionsForm';

export default defineComponent({
  name: 'ShipmentOptionsView',
  components: {
    MagicForm,
  },

  setup: () => {
    const values = computed(() => {
      return shipmentOptionsForm.fields.value.reduce(
        (acc, element) => ({
          ...acc,
          ...(element.name
            ? {
                [element.name]: element.ref,
              }
            : {}),
        }),
        {},
      );
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
