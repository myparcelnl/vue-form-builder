import {InteractiveElement, InteractiveElementInstance, getDefaultFormConfiguration} from '../../form';
import {PropType, defineComponent, h, ref, vModelText, withDirectives} from 'vue';
import {afterEach, describe, expect, it, vi} from 'vitest';
import {generateForm, mountForm} from '../utils';
import {AnyElementConfiguration} from '../../types';
import {MagicForm} from '../../components';
import {mount} from '@vue/test-utils';
import {useFormBuilder} from '../../composables';

const mockComponent = defineComponent({
  props: {
    modelValue: {
      type: String,
    },
    element: {
      type: Object as PropType<InteractiveElementInstance>,
    },
  },
  render: () => withDirectives(h('div'), [[vModelText]]),
});

const commonFields: AnyElementConfiguration[] = [
  {
    name: 'field',
    component: mockComponent,
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

describe('rendering a form', () => {
  const formBuilder = useFormBuilder();

  afterEach(() => {
    formBuilder.defaults.value = getDefaultFormConfiguration();
    formBuilder.forms.value = Object.create(null);
  });

  it('renders html elements', async () => {
    const wrapper = mountForm(commonFields);
    const formElement = wrapper.find('form');

    expect(formElement.exists()).toBe(true);

    expect(formElement.attributes('id')).toBe('form');
    expect(formElement.findComponent(mockComponent).exists()).toBe(true);
    expect(formElement.find('input').exists()).toBe(true);
    expect(formElement.find('br').exists()).toBe(true);

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('adds class to form', () => {
    formBuilder.defaults.value.form.attributes.class = 'form-class';

    const wrapper = mountForm(commonFields);
    const formElement = wrapper.find('form');
    expect(formElement.classes()).toContain('form-class');
  });

  it('has form as default outer wrapper', () => {
    const wrapper = mountForm(commonFields);
    const firstElement = wrapper.find('*');

    expect(firstElement.element.tagName).toBe('FORM');
  });

  it('outer wrapper can be changed', () => {
    formBuilder.defaults.value.form.tag = 'div';

    const wrapper = mountForm(commonFields);
    const firstElement = wrapper.find('*');

    expect(firstElement.element.tagName).toBe('DIV');
  });

  it('wraps fields with a wrapper element', () => {
    formBuilder.defaults.value.field.wrapper = h('span', {class: 'inner-wrapper'});

    const wrapper = mountForm(commonFields);
    const wrapperElements = wrapper.findAll('span.inner-wrapper');

    expect(wrapperElements).toHaveLength(3);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('defaults to no inner wrapper', () => {
    const wrapper = mountForm(commonFields);

    expect(wrapper.element).toMatchSnapshot();
  });

  it('adds attributes to each field', () => {
    formBuilder.defaults.value.fieldDefaults.attributes.class = 'default-field-class';
    formBuilder.defaults.value.fieldDefaults.attributes['aria-label'] = 'test';

    const wrapper = mountForm(commonFields);
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

  it('renders element prop if it is turned on', () => {
    const wrapper = mountForm(commonFields);

    const input = wrapper.findComponent(mockComponent);

    expect(input.props('element')).toBeInstanceOf(InteractiveElement);
  });

  it('does not render element prop if it is turned off', () => {
    formBuilder.defaults.value.field.elementProp = false;

    const wrapper = mountForm(commonFields);

    const input = wrapper.findComponent(mockComponent);

    expect(input.props('element')).toBeUndefined();
  });
});
