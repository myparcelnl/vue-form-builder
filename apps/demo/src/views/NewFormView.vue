<template>
  <div>
    <h1>New form, without fields array</h1>

    <div class="relative">
      <Form.Component
        :class="formClasses"
        class="border gap-4 grid grid-auto-rows p-4 rounded-lg">
        <div class="gap-4 grid grid-cols-2">
          <FirstName.Component />
          <LastName.Component />
        </div>

        <div v-show="FirstName.field.ref.value === 'Donald'">
          <Email.Label />

          <div>
            <Email.Component />
          </div>

          <Email.Errors v-slot="errors">
            <ul>
              <li
                v-for="error in errors"
                :key="error.message"
                v-text="error" />
            </ul>
          </Email.Errors>
        </div>

        <div
          v-if="FirstName.field.ref.value && LastName.field.ref.value"
          class="flex">
          <div class="border-2 flex-col inline-flex mx-auto my-3 px-6 py-3 rounded-lg text-center">
            <h4>Ben je er klaar voor, {{ FirstName.field.ref.value }} {{ LastName.field.ref.value }}?</h4>

            <div class="gap-4 grid grid-cols-2">
              <div>
                <b>Ja, ik wil dit!</b>

                <div><SubmitButton.Component /></div>
              </div>

              <div>
                <b>Nee, ik wil dit niet!</b>

                <div>
                  <button
                    type="reset"
                    class="-skew-x-12 bg-blue-500 hover:bg-blue-700 hover:font-bold hover:skew-x-12 mt-2 p-3 text-white transition-all"
                    @click="() => Form.form.reset()">
                    Reset!!!
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Form.Component>

      <Form2.Component
        :class="formClasses"
        class="border gap-4 grid grid-auto-rows p-4 rounded-lg">
        <div class="border p-4">
          <Email.Label />

          <Email.Component />

          <Email.Errors v-slot="errors">
            <ul>
              <li
                v-for="error in errors"
                :key="error.message"
                v-text="error" />
            </ul>
          </Email.Errors>
        </div>
      </Form2.Component>
    </div>

    <div>
      <h3>State</h3>
      <p>
        <b>This form is currently {{ Form.form.isDirty.value ? 'dirty! 🤢' : 'clean! ✨' }}</b>
      </p>

      <h3>Values</h3>
      <pre v-text="values" />
      <pre v-text="values2" />

      <h3>Form event log</h3>

      <textarea
        v-model="eventLog"
        class="font-mono w-full"
        rows="10"
        readonly />
    </div>
  </div>
</template>

<script lang="ts" setup>
import {computed, h, ref} from 'vue';
import {get} from '@vueuse/core';
import {defineFieldNew, defineFormNew, type Validator} from '@myparcel-vfb/core';
import {useFormEventLog} from '../composables/useFormEventLog';
import TTextInput from '../components/template/TTextInput.vue';
import FormGroup from '../components/template/FormGroup.vue';
import NewSubmitButton from '../components/NewSubmitButton.vue';

// eslint-disable-next-line @typescript-eslint/naming-convention
const Form = defineFormNew('newForm', {
  form: {
    wrapper: h('div', {class: 'border gap-4 grid grid-auto-rows p-4 rounded-lg'}),
  },

  field: {
    wrapper: FormGroup,
  },
});

const Form2 = defineFormNew('newForm2', {
  form: {
    wrapper: h('div', {class: 'border gap-4 grid grid-auto-rows p-4 rounded-lg'}),
  },

  field: {
    wrapper: FormGroup,
  },
});

const FirstName = defineFieldNew({
  name: 'firstName',
  label: 'First name',
  component: TTextInput,
  ref: ref('mr.'),
});

const LastName = defineFieldNew({
  name: 'lastName',
  label: 'Last name',
  component: TTextInput,
  ref: ref('krabs'),
});

const Email = defineFieldNew({
  name: 'email',
  label: 'Email',
  component: TTextInput,
  wrapper: false,
  props: {
    type: 'email',
  },
  ref: ref('aweawewae'),
  validators: [
    {
      validate: (_, value) => value.length > 5,
      errorMessage: 'Email must be longer than 5 characters',
    },
  ] satisfies Validator[],
});

const SubmitButton = defineFieldNew({component: NewSubmitButton});

const dirty = computed(() => get(Form.form.isDirty));

const formClasses = computed(() => ({
  'border-orange-800': dirty.value,
  'border-transparent': !dirty.value,
}));

const eventLog = useFormEventLog(Form.form);

const values = computed(() => Form.form.getValues());
const values2 = computed(() => Form2.form.getValues());
</script>
