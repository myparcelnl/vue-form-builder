import {afterEach, describe, expect, it, vi} from 'vitest';
import {flushPromises, mount} from '@vue/test-utils';
import {AnyElementConfiguration} from '../../types';
import {MagicForm} from '../../components';
import TextInput from '../elements/TextInput.vue';
import {generateForm} from '../utils/generateForm';
import {ref} from 'vue';
import {useFormBuilder} from '../../composables';

describe('defining a form', () => {
  it('can use vue element wrapper', async () => {
    const form = generateForm({
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

    const wrapper = mount(MagicForm, {props: {form}});
    await flushPromises();
    const formElement = wrapper.find('form');
    expect(formElement.exists()).toBe(true);
    expect(formElement.attributes('id')).toBe('form');
    expect(formElement.find('input').exists()).toBe(true);
    expect(formElement.find('br').exists()).toBe(true);
    expect(formElement.find('input[name="text"]').exists()).toBe(true);
    expect(wrapper.html()).toMatchSnapshot();
  });

  describe('overriding defaults', () => {
    const commonFields: AnyElementConfiguration[] = [
      {
        name: 'field',
        component: 'input',
        ref: ref(''),
        label: 'my_label_1',
      },
      {
        name: 'named',
        component: 'input',
        label: 'my_label_2',
      },
      {
        component: 'br',
      },
    ];

    afterEach(() => {
      useFormBuilder().defaults.value = {};
    });

    it('adds formClass to form', () => {
      useFormBuilder().defaults.value.formClass = 'form-class';

      const form = generateForm(commonFields);
      const wrapper = mount(MagicForm, {props: {form}});
      const formElement = wrapper.find('form');
      expect(formElement.classes()).toContain('form-class');
    });

    it('adds fieldClass to each field', () => {
      useFormBuilder().defaults.value.fieldClass = 'default-field-class';

      const form = generateForm(commonFields);
      const wrapper = mount(MagicForm, {props: {form}});
      const formElement = wrapper.find('form');
      expect(formElement.findAll('.default-field-class')).toHaveLength(3);
    });

    it('makes fields lazy by default using fieldsLazy', () => {
      useFormBuilder().defaults.value.fieldsLazy = true;

      const form = generateForm(commonFields);
      expect(form.model.field.lazy).toBe(true);
    });

    it('makes fields optional by default using fieldsOptional', () => {
      useFormBuilder().defaults.value.fieldsOptional = true;

      const form = generateForm(commonFields);
      expect(form.model.field.isOptional).toBe(true);
    });

    it('calls renderLabel if defined when rendering a label', () => {
      expect.assertions(1);
      const renderLabel = vi.fn((value: string): string => value.toUpperCase());

      useFormBuilder().defaults.value.renderLabel = renderLabel;

      const form = generateForm(commonFields);
      mount(MagicForm, {props: {form}});

      expect(renderLabel).toHaveBeenCalledTimes(1);
    });
  });
});
