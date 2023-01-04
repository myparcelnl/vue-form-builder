import {afterEach, describe, expect, it, vi} from 'vitest';
import {flushPromises, mount} from '@vue/test-utils';
import {h, ref} from 'vue';
import {AnyElementConfiguration} from '../../types';
import {DEFAULT_FORM_CONFIGURATION} from '../../form';
import {MagicForm} from '../../components';
import TextInput from '../elements/TextInput.vue';
import {generateForm} from '../utils/generateForm';
import {useFormBuilder} from '../../composables';

describe('defining a form', () => {
  it('renders html elements', async () => {
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
    const formBuilder = useFormBuilder();

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
      formBuilder.defaults.value = DEFAULT_FORM_CONFIGURATION;
    });

    it('adds class to form', () => {
      formBuilder.defaults.value.form.attributes.class = 'form-class';

      const form = generateForm(commonFields);
      const wrapper = mount(MagicForm, {props: {form}});
      const formElement = wrapper.find('form');
      expect(formElement.classes()).toContain('form-class');
    });

    it('changes tag of outer form wrapper', () => {
      formBuilder.defaults.value.form.tag = 'div';
      formBuilder.defaults.value.form.attributes.class = 'form';

      const form = generateForm(commonFields);
      const wrapper = mount(MagicForm, {props: {form}});
      const formElement = wrapper.find('.form');

      expect(formElement.exists()).toBe(true);
      expect(formElement.element.tagName).toBe('DIV');
      expect(wrapper.find('form').exists()).toBe(false);
    });

    it('wraps fields with a wrapper element', () => {
      formBuilder.defaults.value.form.attributes.class = 'my-form';
      formBuilder.defaults.value.form.wrapper = h('div', {class: 'inner-wrapper'});

      const form = generateForm(commonFields);
      const wrapper = mount(MagicForm, {props: {form}});
      const wrapperElement = wrapper.find('.my-form > .inner-wrapper');

      expect(wrapper.html()).toMatchSnapshot();

      expect(wrapperElement.exists()).toBe(true);
      expect(wrapperElement.element.tagName).toBe('DIV');
    });

    it('adds attributes to each field', () => {
      formBuilder.defaults.value.fieldDefaults.attributes.class = 'default-field-class';
      formBuilder.defaults.value.fieldDefaults.attributes['aria-label'] = 'test';

      const form = generateForm(commonFields);
      const wrapper = mount(MagicForm, {props: {form}});

      const formElement = wrapper.find('form');

      expect(formElement.findAll('.default-field-class')).toHaveLength(3);
      expect(formElement.findAll('[aria-label="test"]')).toHaveLength(3);
    });

    it('makes fields lazy by default', () => {
      formBuilder.defaults.value.fieldDefaults.lazy = true;

      const form = generateForm(commonFields);
      expect(form.model.field.lazy).toBe(true);
    });

    it('makes fields optional by default', () => {
      formBuilder.defaults.value.fieldDefaults.optional = true;

      const form = generateForm(commonFields);
      expect(form.model.field.isOptional.value).toBe(true);
    });

    it('calls renderLabel if defined when rendering a label', () => {
      expect.assertions(1);
      const renderLabel = vi.fn((value: string): string => value.toUpperCase());

      formBuilder.defaults.value.renderLabel = renderLabel;

      const form = generateForm(commonFields);
      mount(MagicForm, {props: {form}});

      expect(renderLabel).toHaveBeenCalledTimes(1);
    });
  });
});
