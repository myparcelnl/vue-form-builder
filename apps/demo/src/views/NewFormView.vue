<template>
  <div>
    <h1>Form without fields array</h1>
    <p>
      These forms are defined entirely in the template. The components can be placed anywhere in the template. When
      <code>wrapper: false</code> is passed when creating the component, you need to manually place the Label and Errors
      component as well.
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
            v-if="FirstName.ref && LastName.ref"
            class="flex">
            <div class="border-2 flex-col inline-flex mx-auto my-3 px-6 py-3 rounded-lg text-center">
              <h4>Are you ready, {{ `${FirstName.ref} ${LastName.ref}`.trim() }}?</h4>

              <div class="gap-4 grid grid-cols-2">
                <div>
                  <SubmitButton.Component outline />
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
              <Email.Errors v-slot="errors">
                <template v-if="errors.length">
                  Some errors have occurred
                  <ul>
                    <li
                      v-for="(error, index) in errors"
                      :key="error.message">
                      Error {{ index + 1 }}: {{ error.message }}
                    </li>
                  </ul>
                </template>
              </Email.Errors>

              <small>This is the email Errors component. You won't see it if there are no errors.</small>
            </div>

            <SubmitButton.Component outline>
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
            </SubmitButton.Component>
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
import {emailValidator, regexValidator, stringLengthValidator, stringNotContainsValidator} from '../validation';
import TTextInput from '../components/template/TTextInput.vue';
import FormGroup from '../components/template/FormGroup.vue';
import ErrorBox from '../components/template/ErrorBox.vue';
import NewSubmitButton from '../components/StandAloneSubmitButton.vue';
import FormDiagnostics from '../components/FormDiagnostics.vue';

const Form = createForm('newForm', {
  form: {
    wrapper: h('div', {class: 'border gap-4 grid grid-auto-rows p-4 rounded-lg'}),
  },

  field: {
    wrapper: FormGroup,
  },
});

const Form2 = createForm('newForm2', {
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
});

const Email = createField({
  name: 'email',
  label: 'Email',
  component: TTextInput,
  wrapper: false,
  props: {
    type: 'email',
  },
  ref: ref(''),
  validators: [stringLengthValidator(5, 30), emailValidator()],
});

const SubmitButton = createField({component: NewSubmitButton});

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
</script>
