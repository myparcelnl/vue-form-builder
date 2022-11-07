import {InteractiveElement, PlainElement, defineField, defineForm} from '../../form';
import {canNotContainLetterValidator, firstNameNotJohnValidator} from './interactive-element/validationData';
import {canNotContainX, firstNameNotDuane} from '@myparcel-vfb/demo/src/forms/validators';
import {describe, expect, it} from 'vitest';
import {flushPromises, mount} from '@vue/test-utils';
import {formIsInvalid, formIsValid} from '../utils/formIsValid';
import {MagicForm} from '../../components';
import TextInput from '../elements/TextInput.vue';
import {generateForm} from '../utils/generateForm';
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
      expect(form.model.test2.ref).toBe('');
      form.model.test2.ref = 'changed';
      expect(form.model.test2.ref).toBe('changed');
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
        ],
      });

      const wrapper = mount(MagicForm, {props: {form: validationForm}});
      const formElement = wrapper.find('form');

      // expect default state to be valid regardless of input
      formIsValid(formElement, validationForm);

      await wrapper.find('input[name="firstName"]').setValue('Karen');
      expect(firstName.value).toBe('Karen');

      await wrapper.find('input[name="lastName"]').setValue('Doe');
      expect(lastName.value).toBe('Doe');

      await formElement.trigger('submit');
      await flushPromises();
      formIsInvalid(formElement, validationForm);
    });

    it('validates using a single function', async () => {
      expect.assertions(1);

      const eep = defineField({
        component: 'input',
        name: 'element',
        ref: ref(''),
        validate: (_, value) => String(value).startsWith('J'),
        errorMessage: 'Field must start with "J"',
      });

      const form = generateForm([eep]);

      await form.validate();
      expect(form.isValid.value).toBe(false);

      expect(form.model.element.errors).toEqual(['Field must start with "J"']);

      form.model.element.ref = 'Joe Mater';

      await form.validate();

      expect(form.isValid.value).toBe(true);
      expect(form.model.element.errors).toEqual([]);
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

      const valid = await form.validate();

      expect(valid).toBe(true);
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

      const result = await form.validate();

      expect(result).toBe(true);
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

      // expect(result).toBe(true);
    });
  });
});
