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

        <Email.Component />

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

                <div><ResetButton.Component /></div>
              </div>
            </div>
          </div>
        </div>
      </Form.Component>
    </div>

    <div>
      <h3>State</h3>
      <p>
        <b>This form is currently {{ Form.form.isDirty.value ? 'dirty! 🤢' : 'clean! ✨' }}</b>
      </p>

      <h3>Values</h3>
      <pre v-text="values" />

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
import {defineFieldNew, defineFormNew} from '@myparcel-vfb/core';
import {useFormEventLog} from '../composables/useFormEventLog';
import TTextInput from '../components/template/TTextInput.vue';
import TSubmitButton from '../components/template/TSubmitButton.vue';
import TResetButton from '../components/template/TResetButton.vue';
import FormGroup from '../components/template/FormGroup.vue'; // eslint-disable-next-line @typescript-eslint/naming-convention

// eslint-disable-next-line @typescript-eslint/naming-convention
const Form = defineFormNew('newForm', {
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
  ref: ref('Mr.'),
});

const LastName = defineFieldNew({
  name: 'lastName',
  label: 'Last name',
  component: TTextInput,
  ref: ref('Krabs'),
});

const Email = defineFieldNew({
  name: 'email',
  label: 'Email',
  component: TTextInput,
  props: {
    type: 'email',
  },
  ref: ref('mrkrabs@krokantekrab.bb'),
});

const SubmitButton = defineFieldNew({component: TSubmitButton});

const ResetButton = defineFieldNew({component: TResetButton});

const dirty = computed(() => get(Form.form.isDirty));

const formClasses = computed(() => ({
  'border-orange-800': dirty.value,
  'border-transparent': !dirty.value,
}));

const eventLog = useFormEventLog(Form.form);

const values = computed(() => Form.form.getValues());
</script>
