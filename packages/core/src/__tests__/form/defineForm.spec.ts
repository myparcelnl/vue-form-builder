import {InteractiveElement, PlainElement, defineField, defineForm} from '../../form';
import {canNotContainLetterValidator, firstNameNotJohnValidator} from './interactive-element/validationData';
import {canNotContainX, firstNameNotDuane} from '@myparcel-vfb/demo/src/forms/validators';
import {describe, expect, it} from 'vitest';
import {formIsInvalid, formIsValid} from '../utils/formIsValid';
import {MagicForm} from '../../components';
import TextInput from '../elements/TextInput.vue';
import SubmitButton from '../elements/SubmitButton.vue';
import Select from '../elements/Select.vue';
import {generateForm} from '../utils/generateForm';
import {flushPromises, mount} from '@vue/test-utils';
import {ref} from 'vue';
import {removeUndefinedValues} from '../utils/removeUndefinedValues';

describe('Form Generation', () => {
  describe('defining a form', () => {
    const form = generateForm([
      {
        name: 'named',
        component: 'input',
      },
      {
        component: 'br',
      },
      {
        name: 'text',
        component: TextInput,
        ref: ref('initial'),
      },
    ]);

    it('creates a reactive model from named elements', () => {
      const form = generateForm([
        defineField({
          component: 'input',
          ...removeUndefinedValues(undefined),
        }),
        {
          ...defineField({
            component: 'input',
            ...removeUndefinedValues(undefined),
          }),
          name: 'element',
          ...removeUndefinedValues({name: 'test'}),
        },
        defineField({
          ...{
            ...defineField({
              component: 'input',
              ...removeUndefinedValues(undefined),
            }),
            name: 'element',
            ...removeUndefinedValues(undefined),
          },
          ref: ref(''),
          ...removeUndefinedValues({name: 'test2'}),
        }),
      ]);

      expect(Object.keys(form.model)).toEqual(['test', 'test2']);
      expect(form.model.test).toBeInstanceOf(PlainElement);
      expect(form.model.test2).toBeInstanceOf(InteractiveElement);
      expect(form.model.test2.ref.value).toBe('');
      form.model.test2.ref.value = 'changed';
      expect(form.model.test2.ref.value).toBe('changed');
    });

    it('can use vue element wrapper', () => {
      const wrapper = mount(MagicForm, {props: {form}});
      const formElement = wrapper.find('form');

      expect(formElement.exists()).toBe(true);
      expect(formElement.attributes('id')).toBe('form');
      expect(formElement.find('input').exists()).toBe(true);
      expect(formElement.find('br').exists()).toBe(true);
      expect(formElement.find('input[name="text"]').exists()).toBe(true);
      expect(wrapper.html()).toMatchSnapshot();
    });
  });

  describe('validation', () => {
    it('can determine if a text input is valid based on single predicate', async () => {
      expect.assertions(11);
      const firstName = ref('');
      const lastName = ref('');
      const validationForm = defineForm('validationForm', {
        fields: [
          defineField({
            name: 'firstName',
            component: TextInput,
            ref: firstName,
            validate: (_, value) => String(value).startsWith('J'),
            errorMessage: 'Field must start with "J"',
          }),
          defineField({
            name: 'lastName',
            component: TextInput,
            ref: lastName,
          }),
          defineField({
            component: SubmitButton,
          }),
        ],
      });

      const wrapper = mount(MagicForm, {props: {form: validationForm}});
      const formElement = wrapper.find('form');

      // expect default state to be valid regardless of input
      formIsValid(formElement, validationForm);

      await wrapper.find('#firstName__container input').setValue('Karen');
      expect(firstName.value).toBe('Karen');

      await wrapper.find('#lastName__container input').setValue('Doe');
      expect(lastName.value).toBe('Doe');

      await validationForm.submit();

      const firstNameWarning = wrapper.find('#firstName__container .warnings');
      expect(firstNameWarning.exists()).toBe(true);
      expect(firstNameWarning.text()).toBe('Field must start with "J"');

      const lastNameWarning = wrapper.find('#lastName__container .warnings');
      expect(lastNameWarning.exists()).toBe(false);

      formIsInvalid(formElement, validationForm);
    });

    it('can determine if a text input is valid based on previous inputs and predicates', async () => {
      const firstName = ref('');
      const lastName = ref('');
      const validationForm = defineForm('validationForm', {
        fields: [
          defineField({
            name: 'firstName',
            component: TextInput,
            ref: firstName,
            validate: (_, value) => String(value).startsWith('J'),
            errorMessage: 'Field must start with "J"',
          }),
          defineField({
            name: 'lastName',
            component: TextInput,
            ref: lastName,
            validate: (field, value) => !(
              field.form.model.firstName.ref.value === 'Jack' &&
              String(value) === 'McGill'
            ),
            errorMessage: 'Last name cannot be "McGill" if first name is "Jack"',
          }),
          defineField({
            component: SubmitButton,
          }),
        ],
      });
      const wrapper = mount(MagicForm, {props: {form: validationForm}});
      const formElement = wrapper.find('form');
      formIsValid(formElement, validationForm);

      await wrapper.find('#firstName__container input').setValue('Jack');
      await wrapper.find('#lastName__container input').setValue('McGill');

      await validationForm.submit();

      const lastNameWarning = wrapper.find('#lastName__container .warnings');
      expect(lastNameWarning.text()).toBe('Last name cannot be "McGill" if first name is "Jack"');

      formIsInvalid(formElement, validationForm);

      await wrapper.find('#lastName__container input').setValue('Taves');

      await validationForm.submit();
      formIsValid(formElement, validationForm);
    });

    it('can load external data into option selector with timeout', async () => {
      const firstName = ref('');
      const option = ref('Package');
      const validationForm = defineForm('validationForm', {
        fields: [
          defineField({
            name: 'firstName',
            component: TextInput,
            ref: firstName,
          }),
          defineField({
            name: 'options',
            component: Select,
            ref: option,
            props: {
              options: [
                {
                  label: 'Package',
                  value: 'package',
                },
                {
                  label: 'Mailbox',
                  value: 'mailbox',
                },
                {
                  label: 'Letter',
                  value: 'letter',
                },
                {
                  label: 'Digital Stamp',
                  value: 'digital_stamp',
                },
              ],
            },
          }),
          defineField({
            component: SubmitButton,
          }),
        ],
      });
      const wrapper = mount(MagicForm, {props: {form: validationForm}});
      const item = wrapper.find('#options__container select').setValue('mailbox')
      console.log(wrapper.html());
      expect(option.value).toBe('mailbox');
    });

    it('validates using a single function', async () => {
      expect.assertions(4);

      const form = generateForm([
        defineField({
          component: 'input',
          name: 'element',
          ref: ref(''),
          validate: (_, value) => String(value).startsWith('J'),
          errorMessage: 'Field must start with "J"',
        }),
      ]);

      form.model.element.ref.value = 'Peter';
      await form.submit();
      expect(form.isValid.value).toBe(false);
      expect(form.model.element.errors.value).toEqual(['Field must start with "J"']);

      form.model.element.ref.value = 'Joe Mater';
      await form.submit();
      expect(form.isValid.value).toBe(true);
      expect(form.model.element.errors.value).toEqual([]);
    });

    it('validates using an array of validators', async () => {
      expect.assertions(1);

      const form = generateForm([
        defineField({
          component: 'input',
          name: 'element',
          ref: ref(''),
          validators: [firstNameNotJohnValidator(), canNotContainLetterValidator()],
        }),
      ]);

      await form.submit();
      expect(form.isValid.value).toBe(true);
    });

    it('validates using a computed validator', async () => {
      expect.assertions(1);

      const form = generateForm([
        defineField({
          component: 'input',
          name: 'element',
          ref: ref(''),
          validators: [firstNameNotDuane(), canNotContainX()],
        }),
      ]);

      await form.submit();
      expect(form.isValid.value).toBe(true);
    });

    it('can be reset', async () => {
      expect.assertions(1);

      const field = defineField({
        component: 'input',
        name: 'element',
        ref: ref(''),
        validators: [firstNameNotDuane()],
      });

      const form = generateForm([field]);

      await form.model.element.reset();

      expect(form.isValid.value).toBe(true);
    });
  });
});
