import {defineForm} from '../../form';
import {ref} from 'vue';
import {afterAll, beforeAll, describe, expect, it, SpyInstance} from 'vitest';
import { DOMWrapper, flushPromises, mount } from '@vue/test-utils';
import TextInput from '../elements/TextInput.vue';
import { vi } from 'vitest';
import { FormInstance } from '../../../lib';
import { InteractiveElement } from '../../form/interactive-element';
import { MagicForm } from '../../components';

const formIsInvalid = (formElement: DOMWrapper<HTMLElement>, form: FormInstance) => {
  expect(form.isValid.value).toBe(false);
  expect(formElement.classes()).toContain('invalid');
  expect(formElement.classes()).not.toContain('valid');
};

const formIsValid = (formElement: DOMWrapper<HTMLElement>, form: FormInstance) => {
  expect(form.isValid.value).toBe(true);
  expect(formElement.classes()).toContain('valid');
  expect(formElement.classes()).not.toContain('invalid');
}

describe('Form Generation', () => {
  let consoleSpy: SpyInstance;
  beforeAll(() => {
    consoleSpy = vi.spyOn(console, 'info').mockImplementation(() => {});
  });

  afterAll(() => {
    consoleSpy.mockRestore();
  });
  describe.skip('form builder', () => {
    const form = defineForm('test', {
      fields: [
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
      ],
    });
    it('works', () => {
      // expect(form.model.named).toBeInstanceOf(InteractiveElement);
      expect(form.model.text).toBeInstanceOf(InteractiveElement);

      expect(form.model.text.ref).toEqual('initial');

      form.model.text.ref = 'changed';
      expect(form.model.text.ref).toEqual('changed');

      // expect(form.registeredHooks).toEqual([]);
      // expect(form.fields).toEqual({
      //   toggle: {
      //     component: CustomCheckbox,
      //   },
      // });
    });

    it('can use vue element wrapper', async () => {
      const wrapper = mount(MagicForm, {
        props: {
          form,
        },
      });
      await flushPromises();
      const formElement = wrapper.find('form');
      expect(formElement.exists()).toBe(true);
      expect(formElement.attributes('id')).toBe('test');
      expect(formElement.find('input').exists()).toBe(true);
      expect(formElement.find('br').exists()).toBe(true);
      expect(formElement.find('input[name="text"]').exists()).toBe(true);
      expect(wrapper.html()).toMatchSnapshot();
    });
  });

  describe('basic validation', () => {
    it('can determine if a text input is valid based on single predicate', async () => {
      const firstName = ref('');
      const lastName = ref('');
      const validationForm = defineForm('validationForm', {
        fields: [
          {
            name: 'firstName',
            component: TextInput,
            ref: firstName,
            validate: (_, value) => String(value).startsWith('J'),
            errorMessage: 'Field must start with "J"',
          },
          {
            name: 'lastName',
            component: TextInput,
            ref: lastName,
          },
        ],
      });
      const wrapper = mount(MagicForm, {
        props: {
          form: validationForm,
        },
      });
      await flushPromises();
      const formElement = wrapper.find('form');

      // expect default state to be valid regardless of input
      formIsValid(formElement, validationForm);

      const firstNameInput = wrapper.find('input[name="firstName"]');
      await firstNameInput.setValue('Karen');
      expect(firstName.value).toBe('Karen');

      const lastNameInput = wrapper.find('input[name="lastName"]');
      await lastNameInput.setValue('Doe');
      expect(lastName.value).toBe('Doe');

      await formElement.trigger('submit');
      await flushPromises();
      formIsInvalid(formElement, validationForm);
    });
  });
})
