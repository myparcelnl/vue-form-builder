<template>
  <!--
    <div class="py-4 divide-x divide-solid flex">
    <div
    class="pr-4 text-xl"
    @click="preset('a')"
    >Preset Address A</div>
    <div
    class="px-4 text-xl"
    @click="preset('b')"
    >Preset Address B</div>
    </div>
  -->
  <form @submit.prevent="submit">
    <template v-for="(field, K) in form.fields" :key="`pre${key}`">
      <!--      <div class="bg-rose-100 p-4 rounded-xl"> -->
      <!--        <h2 class="font-bold text-amber-800 text-lg">Field</h2> -->
      <!--        <pre -->
      <!--          class="text-sm" -->
      <!--          v-text="field"></pre> -->
      <!--      </div> -->

      <template v-if="isField(field)">
        <div v-if="field.isVisible" class="py-2">
          <label v-if="field.label" class="inline-block pr-4 w-48"
            >{{ field.label }}:

            <!--            <template v-if="field.component.name !== 'CustomCheckbox'"> -->
            <!--              :value="field.ref ? field.ref : form.state[K]" -->
            <component
              :is="field.component"
              :id="key"
              v-bind="field.props"
              v-model="field.ref"
              :validation-warnings="field.validationWarnings"
              :class="{
                'border-red-600': !field.isValid,
              }"
            />
          </label>
          <!--            </template> -->
          <!--            <template v-if="field.component.name === 'CustomCheckbox'"> -->
          <!--              <input -->
          <!--                :id="K" -->
          <!--                type="checkbox" -->
          <!--                :checked="form.state[K]" -->
          <!--                @change="({target: {checked}}) => field.input(checked)" /> -->
          <!--              <label -->
          <!--                :for="K" -->
          <!--                class="pl-4" -->
          <!--                >{{ field.props.label }} -->
          <!--              </label> -->
          <!--            </template> -->

          <span v-if="field.isSuspended" class="px-4"> Loading... </span>
          <span v-if="field.isOptional" class="px-4"> (optional) </span>
          <div v-if="field.validationWarnings" class="flex flex-col">
            <span v-for="warning in field.validationWarnings" :key="warning" class="pl-4 py-1 text-red-600">
              {{ warning }}
            </span>
          </div>
        </div>
      </template>
    </template>
    <button type="submit" class="border hover:bg-sky-100 my-4 px-4 py-2 rounded">Save</button>
    <p class="py-8 text-3xl">Values</p>
    <pre>{{ form.state }}</pre>
  </form>
</template>

<script lang="ts">
import { PropType, defineComponent, ref } from "vue";
import { Field, Form } from "./Field";

export default defineComponent({
  name: "PdkForm",

  props: {
    form: {
      type: Object as PropType<Form>,
      required: true,
    },
  },

  emits: {
    beforeSubmit: null,
    afterSubmit: null,
  },

  setup: (props, ctx) => {
    // const preset = (preset: string) => {
    //   if (preset === "a") {
    //     form.state.pickupAddress = false;
    //     form.state.defaultPickupAddress = false;
    //     form.state.shop = "";
    //     form.state.country = "NL";
    //     form.state.state = "";
    //     form.state.companyName = "MyParcel";
    //     form.state.name = "Piet Mandjes";
    //     form.state.postcode = "2132 JE";
    //     form.state.housenumber = "31";
    //     form.state.street = "Antareslaan";
    //     form.state.street2 = "";
    //     form.state.city = "Hoofddorp";
    //     form.state.email = "";
    //     form.state.phone = "";
    //   } else if (preset === "b") {
    //     form.state.pickupAddress = false;
    //     form.state.defaultPickupAddress = false;
    //     form.state.shop = "";
    //     form.state.country = "US";
    //     form.state.state = "NM";
    //     form.state.companyName = "Sweet Liberty Tax Services";
    //     form.state.name = "Betsy Kettleman";
    //     form.state.postcode = "87109";
    //     form.state.housenumber = "";
    //     form.state.street = "78992 Cimarron Street NE";
    //     form.state.street2 = "";
    //     form.state.city = "Albuquerque";
    //     form.state.email = "";
    //     form.state.phone = "";
    //   }
    // };

    // preset("a");

    const isInstanceOf = <T extends Function>(type: T, value: unknown): value is T => {
      return value instanceof type;
    };

    const isField = (value: unknown) => isInstanceOf(Field, value);

    const formValid = ref();

    return {
      isField,
      // preset,
      formValid,

      submit() {
        ctx.emit("beforeSubmit", props.form);
        props.form.submit();
        ctx.emit("afterSubmit", props.form);
      },
    };
  },
});
</script>

<style scoped></style>
