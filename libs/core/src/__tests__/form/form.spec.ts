import {h, ref, reactive} from 'vue';
import {afterEach, describe, expect, it, vi} from 'vitest';
import {flushPromises} from '@vue/test-utils';
import {createField} from '../../utils';
import {Field} from '../../form';
import {getDefaultFormConfiguration} from '../../data';
import {useFormBuilder} from '../../composables';
import {renderTestForm} from './renderTestForm';
import {mockComponent} from './mockComponent';
import {getCommonFields} from './getCommonFields';

describe('rendering a form', () => {
  const formBuilder = useFormBuilder();

  afterEach(() => {
    formBuilder.setDefaults(getDefaultFormConfiguration());
    formBuilder.forms.value = Object.create(null);
  });

  it('renders html elements', async () => {
    const {wrapper} = await renderTestForm();
    const formElement = wrapper.find('form');

    expect(formElement.exists()).toBe(true);

    expect(wrapper.html()).toMatchSnapshot();

    expect(formElement.attributes('id')).toBe('test');
    expect(formElement.find('input').exists()).toBe(true);
    expect(formElement.findComponent(mockComponent).exists()).toBe(true);
  });

  it('adds class to form', async () => {
    const {wrapper} = await renderTestForm({
      form: {
        attributes: {
          class: 'form-class',
          'data-test': 'test',
        },
      },
    });
    const formElement = wrapper.find('form');

    expect(formElement.exists()).toBe(true);
    expect(formElement.classes()).toContain('form-class');
    expect(formElement.attributes('data-test')).toBe('test');
  });

  it('has form as default outer wrapper', async () => {
    const {wrapper} = await renderTestForm();
    const firstElement = wrapper.find('*');

    expect(firstElement.element.tagName).toBe('FORM');
  });

  it('has customizable outer wrapper tag', async () => {
    const {wrapper} = await renderTestForm({
      form: {
        tag: 'div',
      },
    });
    const firstElement = wrapper.find('*');

    expect(firstElement.element.tagName).toBe('DIV');
  });

  it('wraps fields with a wrapper element', async () => {
    const {wrapper} = await renderTestForm(
      {
        field: {
          wrapper: h('span', {class: 'inner-wrapper'}),
        },
      },
      [
        createField({
          name: 'field',
          component: mockComponent,
          ref: ref(''),
        }),
      ],
    );

    const wrapperElements = wrapper.findAll('span.inner-wrapper');

    expect(wrapperElements).toHaveLength(1);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('adds attributes to each field', async () => {
    formBuilder.defaults.value.fieldDefaults.attributes.class = 'default-field-class';
    formBuilder.defaults.value.fieldDefaults.attributes['aria-label'] = 'test';

    const {wrapper} = await renderTestForm();
    const formElement = wrapper.find('form');

    expect(formElement.findAll('.default-field-class')).toHaveLength(3);
    expect(formElement.findAll('[aria-label="test"]')).toHaveLength(3);
  });

  it('makes fields lazy by default', async () => {
    const {form} = await renderTestForm({fieldDefaults: {lazy: true}});

    expect(form.instance.model.field1.lazy).toBe(true);
  });

  it('makes fields optional by default', async () => {
    const {form} = await renderTestForm({fieldDefaults: {optional: true}});

    expect(form.instance.model.field1.isOptional.value).toBe(true);
  });

  it('calls renderLabel if defined when rendering a label', async () => {
    expect.assertions(1);
    const renderLabel = vi.fn((value: string): string => value.toUpperCase());

    await renderTestForm({renderLabel}, getCommonFields());

    expect(renderLabel).toHaveBeenCalledTimes(3);
  });

  it('renders element prop if it is turned on', async () => {
    const {wrapper} = await renderTestForm();

    const input = wrapper.findComponent(mockComponent);

    expect(input.props('element')).toBeInstanceOf(Field);
  });

  it('does not render element prop if it is turned off', async () => {
    const {wrapper} = await renderTestForm({field: {elementProp: false}}, getCommonFields());

    const input = wrapper.findComponent(mockComponent);

    expect(input.props('element')).toBeUndefined();
  });

  describe('setValue', () => {
    it('sets the value of a single field', async () => {
      expect.assertions(1);
      const {form} = await renderTestForm();
      form.instance.setValue('field', '12345');
      await flushPromises();

      expect(reactive(form.instance.values)).toEqual({field: '12345', field2: ''});
    });

    it('does nothing if field does not exist', async () => {
      expect.assertions(1);
      const {form} = await renderTestForm();
      form.instance.setValue('does-not-exist', 'boo');
      await flushPromises();

      expect(reactive(form.instance.values)).toEqual({field: '', field2: ''});
    });
  });

  describe('setValues', () => {
    it('sets the value of multiple fields', async () => {
      expect.assertions(1);
      const {form} = await renderTestForm();
      form.instance.setValues({field1: 'bye', field2: 'hello'});
      await flushPromises();

      expect(reactive(form.instance.values)).toEqual({field1: 'bye', field2: 'hello'});
    });

    it('ignores fields that do not exist', async () => {
      expect.assertions(1);
      const {form} = await renderTestForm();
      form.instance.setValues({field1: 'value', wee: '3', field2: 'hi'});
      await flushPromises();

      expect(form.instance.values).toEqual({field1: 'value', field2: 'hi', field3: ''});
    });
  });
});
