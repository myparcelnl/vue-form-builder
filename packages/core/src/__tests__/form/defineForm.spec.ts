import {canNotContainLetterValidator, firstNameNotJohnValidator} from './interactive-element/validationData';
import {describe, expect, it} from 'vitest';
import {formIsInvalid, formIsValid} from '../utils/formIsValid';
import InteractiveElement from '../../components/InteractiveElement.vue';
import {MagicForm} from '../../components';
import {PlainElement} from '@myparcel-vfb/form-builder/src';
import TextInput from '../elements/TextInput.vue';
import {defineField} from '../../defineField';
import {defineForm} from '../../defineForm';
import {generateForm} from '../utils/generateForm';
import {mount} from '@vue/test-utils';
import {ref} from 'vue';

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
          name: 'element',
        }),
        defineField({
          component: 'input',
          name: 'test2',
          ref: ref(''),
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
      expect.assertions(8);
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

      await validationForm.submit();
      formIsInvalid(formElement, validationForm);
    });

    it('validates using a single function', async () => {
      expect.assertions(1);

      const form = generateForm([
        defineField({
          component: 'input',
          name: 'element',
          ref: ref(''),
          validate: (_, value) => String(value).startsWith('J'),
          errorMessage: 'Field must start with "J"',
        }),
      ]);

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
          validators: [firstNameNotJohnValidator(), canNotContainLetterValidator()],
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
        validators: [firstNameNotJohnValidator()],
      });

      const form = generateForm([field]);

      await form.model.element.reset();

      // expect(result).toBe(true);
    });
  });
});
