/* eslint-disable @typescript-eslint/ban-ts-comment,@typescript-eslint/no-unused-vars */
import {ref} from 'vue';
import {
  type AnyElementConfiguration,
  type InteractiveElementConfiguration,
  type PlainElementConfiguration,
  defineField,
  defineForm,
} from '@myparcel/vue-form-builder/ts';

const interactiveFieldConfig = {
  name: 'name',
  component: 'input',
  label: 'Name',
  ref: ref('stringie'),
};
const interactiveField = defineField(interactiveFieldConfig);
const field1: AnyElementConfiguration = interactiveFieldConfig;
const field2: InteractiveElementConfiguration = interactiveFieldConfig;
// @ts-expect-error
const field4: PlainElementConfiguration = interactiveFieldConfig;

const namedFieldConfig = {
  name: 'element',
  component: 'input',
};
const namedField = defineField(namedFieldConfig);
const field5: AnyElementConfiguration = namedFieldConfig;
// @ts-expect-error
const field6: InteractiveElementConfiguration = namedFieldConfig;
const field8: PlainElementConfiguration = namedFieldConfig;

const plainFieldConfig = {
  component: 'input',
};
const plainField = defineField(plainFieldConfig);
const field9: AnyElementConfiguration = plainFieldConfig;
// @ts-expect-error
const field10: InteractiveElementConfiguration = plainFieldConfig;
const field12: PlainElementConfiguration = plainFieldConfig;

const form = defineForm('form', {
  fields: [interactiveField, namedField, plainField],
});

form.model.name.ref = 'stringie';
