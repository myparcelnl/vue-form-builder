<template>
  <div class="bg-pink-900 outline outline-2 outline-offset-2 outline-pink-800 p-3 rounded-lg">
    <h1>Het Bonnetje</h1>

    <table class="table w-full">
      <tr
        v-for="(value, key) in model"
        :key="key">
        <td>{{ key }}</td>
        <td>
          <pre>{{ value }}</pre>
        </td>
      </tr>

      <tr>
        <td colspan="2">
          <hr />
        </td>
      </tr>

      <tr>
        <td>
          <strong>Total</strong>
        </td>

        <td class="align-top">
          <div class="flex relative">
            <span class="absolute animate-spin m-auto">❓</span>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, inject} from 'vue';
import {INJECT_FORM} from '@myparcel/vue-form-builder/src';

export default defineComponent({
  name: 'Bonnetje',

  setup: () => {
    const form = inject(INJECT_FORM);

    const values = computed(() => {
      return form?.getValues();
    });

    return {
      model: values,
    };
  },
});
</script>
