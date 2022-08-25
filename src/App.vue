<template>
  <div>
    <PdkForm :form="addressForm"></PdkForm>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PdkForm from "./components/form-builder/PdkForm.vue";
import { useAddressForm } from "./useAddressForm";

export default defineComponent({
  name: "App",
  components: {
    PdkForm,
  },

  setup: () => {
    return {
      addressForm: useAddressForm(),
    };
  },
});
</script>
