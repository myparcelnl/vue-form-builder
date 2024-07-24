<template>
  <div>
    <h1>Form demo</h1>
    <p>
      These forms are defined entirely in the template. The components can be placed anywhere in the template. You can
      even choose to manually place the Label and Errors components as well.
    </p>

    <div class="gap-2 grid grid-cols-2 grid-flow-row mt-4">
      <div>
        <Form.Component :class="form1Classes">
          <h1>Form 1</h1>

          <div class="gap-4 grid grid-cols-2">
            <div>
              <FirstName.Component />
              <small>Try filling in "Plankton" here</small>
            </div>

            <LastName.Component />
          </div>

          <div v-show="FirstName.ref === 'Plankton'">
            <Email.Label />

            <div>
              <Email.Component />
            </div>

            <Email.Errors v-slot="{errors}">
              <pre v-text="errors"></pre>

              <ErrorBox
                v-if="errors.length"
                :errors="errors" />
            </Email.Errors>
          </div>

          <div
            v-show="FirstName.ref && LastName.ref"
            class="flex">
            <div class="border-2 flex-col inline-flex mx-auto my-3 px-6 py-3 rounded-lg text-center">
              <h4>Are you ready, {{ `${FirstName.ref} ${LastName.ref}`.trim() }}?</h4>

              <div class="gap-4 grid grid-cols-2">
                <div>
                  <TSubmitButton />
                </div>

                <div>
                  <TButton @click="onSubmitClick"> Fake submit </TButton>
                </div>

                <div>
                  <TButton @click="switchOptional"> Switch optional </TButton>
                </div>

                <button
                  class="-skew-x-12 bg-blue-500 hover:bg-blue-700 hover:font-bold hover:skew-x-12 mt-2 p-3 text-white transition-all"
                  type="reset"
                  @click="() => Form.instance.reset()">
                  Reset!!!
                </button>
              </div>
            </div>
          </div>
        </Form.Component>

        <FormDiagnostics :form="Form.instance" />
      </div>

      <div>
        <Form2.Component :class="form2Classes">
          <h1>Form 2</h1>

          <p>This form reuses the email field from the first form</p>

          <div class="bg-opacity-5 bg-white gap-2 grid grid-auto-rows rounded-lg shadow-lg">
            <Description.Component />

            <div class="border border-yellow-300 flex-col inline-flex p-2">
              <Email.Label />
              <small>This is the email label</small>
            </div>

            <div class="border p-4">
              This is a random div, just to show the field's components can be placed anywhere.
            </div>

            <div class="border border-green-500 flex-col inline-flex p-2">
              <Email.Component />
              <small>This is the email component itself</small>
            </div>

            <div class="border border-purple-500 flex-col inline-flex p-2">
              <Email.Errors v-slot="{errors}">
                <template v-if="errors.length">
                  <b class="my-2">One or more errors have occurred:</b>

                  <ul class="border p-5 rounded-xl">
                    <li
                      v-for="(error, index) in errors"
                      :key="error">
                      {{ index + 1 }}: {{ error }}
                    </li>
                  </ul>
                </template>
              </Email.Errors>

              <small>This is the email Errors component. You won't see it if there are no errors.</small>
            </div>

            <TResetButton outline>
              <template #icon="{icon}">
                <span class="inline-flex">
                  <span class="inline-flex relative">
                    {{ icon }}
                    <span
                      class="absolute m-auto"
                      v-text="'🚫'" />
                  </span>

                  <span> 🦷</span>
                </span>
              </template>

              <template #default> Default slot! </template>
            </TResetButton>
          </div>
        </Form2.Component>

        <FormDiagnostics :form="Form2.instance" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
/* eslint-disable @typescript-eslint/naming-convention */
import {computed, h, ref} from 'vue';
import {createField, createForm} from '@myparcel-vfb/core';
import {regexValidator, stringLengthValidator, stringNotContainsValidator, emailValidator} from '../validation';
import TTextInput from '../components/template/TTextInput.vue';
import TSubmitButton from '../components/template/TSubmitButton.vue';
import TResetButton from '../components/template/TResetButton.vue';
import TButton from '../components/template/TButton.vue';
import FormGroup from '../components/template/FormGroup.vue';
import ErrorBox from '../components/template/ErrorBox.vue';
import FormDiagnostics from '../components/FormDiagnostics.vue';

const Form = createForm<{
  firstName: string;
  lastName: string;
  email: string;
}>('newForm', {
  form: {
    wrapper: h('div', {class: 'border gap-4 grid grid-auto-rows p-4 rounded-lg'}),
  },

  field: {
    wrapper: FormGroup,
  },

  afterSubmit: (form: FormInstance) => {
    console.log('submit!', form);
  },
});

const Form2 = createForm<{
  description: string;
  email: string;
}>('newForm2', {
  form: {
    wrapper: h('div', {class: 'border gap-4 grid grid-auto-rows p-4 rounded-lg'}),
  },

  field: {
    wrapper: FormGroup,
  },
});

const FirstName = createField({
  name: 'firstName',
  label: 'First name',
  component: TTextInput,
  ref: ref('Mr.'),
  validators: [stringLengthValidator(2, 12), stringNotContainsValidator(['x', 'y', 'z'])],
});

const LastName = createField({
  name: 'lastName',
  label: 'Last name',
  component: TTextInput,
  ref: ref('Krabs'),
  optional: true,
});

const Email = createField({
  name: 'email',
  label: 'Email',
  component: TTextInput,
  // This is necessary because there's a global wrapper defined in the form options.
  wrapper: false,
  props: {
    type: 'email',
  },
  ref: ref(''),
  validators: [stringLengthValidator(5, 30), emailValidator(), stringNotContainsValidator(['x', 'y', 'z', 'q', 'w'])],
});

const Description = createField({
  name: 'description',
  component: TTextInput,
  label: 'Description',
  ref: ref(''),
  validators: [stringLengthValidator(5, 30), stringNotContainsValidator(['e']), regexValidator(/^\w\s\d\.,+$/)],
});

const form1Classes = computed(() => {
  const {isDirty} = Form.instance;
  const {isValid} = Form.instance;

  return {
    'border-red-500': isDirty && !isValid,
    'border-green-500': isDirty && isValid,
  };
});

const form2Classes = computed(() => {
  const {isDirty} = Form2.instance;
  const {isValid} = Form2.instance;

  return {
    'border-purple-500': isDirty && !isValid,
    'border-blue-500': isDirty && isValid,
  };
});

const onSubmitClick = () => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const field = Form2.instance.getField('description');

  field.errors.value.push('This is an error from afterSubmit');
  field.isValid.value = false;
};

const switchOptional = () => {
  const field = Form.instance.getField('lastName');
  field.setOptional(!field.isOptional.value);
};
</script>
