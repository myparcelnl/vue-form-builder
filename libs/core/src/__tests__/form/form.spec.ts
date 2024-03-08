import {type PropType, defineComponent, h, ref, vModelText, withDirectives, reactive} from 'vue';
import {afterEach, describe, expect, it, vi} from 'vitest';
import {mount, flushPromises} from '@vue/test-utils';
import {generateForm, mountForm} from '../utils';
import {type ElementProp} from '../../types';
import {Field} from '../../form';
import {getDefaultFormConfiguration} from '../../data';
import {useFormBuilder} from '../../composables';
import MagicForm from '../../components/MagicForm.vue';

const mockComponent = defineComponent({
  props: {
    modelValue: {
      type: String,
    },
    element: {
      type: Object as PropType<ElementProp>,
    },
  },
  render: () => withDirectives(h('div'), [[vModelText]]),
});

type CommonFieldsValues = {
  field: string;
  named: string;
};

const getCommonFields = () => {
  return [
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
      name: 'field2',
      component: mockComponent,
      ref: ref(''),
      label: 'my_label_2',
    },

    {
      component: 'br',
    },
  ];
};

describe('rendering a form', () => {
  const formBuilder = useFormBuilder();

  afterEach(() => {
    formBuilder.defaults.value = getDefaultFormConfiguration();
    formBuilder.forms.value = Object.create(null);
  });

  it('renders html elements', () => {
    const wrapper = mountForm<CommonFieldsValues>(getCommonFields());
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

    const wrapper = mountForm<CommonFieldsValues>(getCommonFields());
    const formElement = wrapper.find('form');
    expect(formElement.classes()).toContain('form-class');
  });

  it('has form as default outer wrapper', () => {
    const wrapper = mountForm<CommonFieldsValues>(getCommonFields());
    const firstElement = wrapper.find('*');

    expect(firstElement.element.tagName).toBe('FORM');
  });

  it('outer wrapper can be changed', () => {
    formBuilder.defaults.value.form.tag = 'div';

    const wrapper = mountForm<CommonFieldsValues>(getCommonFields());
    const firstElement = wrapper.find('*');

    expect(firstElement.element.tagName).toBe('DIV');
  });

  it('wraps fields with a wrapper element', () => {
    formBuilder.defaults.value.field.wrapper = h('span', {class: 'inner-wrapper'});

    const wrapper = mountForm<CommonFieldsValues>(getCommonFields());
    const wrapperElements = wrapper.findAll('span.inner-wrapper');

    expect(wrapperElements).toHaveLength(4);
    expect(wrapper.element).toMatchSnapshot();
  });

  it('defaults to no inner wrapper', () => {
    const wrapper = mountForm<CommonFieldsValues>(getCommonFields());

    expect(wrapper.element).toMatchSnapshot();
  });

  it('adds attributes to each field', () => {
    formBuilder.defaults.value.fieldDefaults.attributes.class = 'default-field-class';
    formBuilder.defaults.value.fieldDefaults.attributes['aria-label'] = 'test';

    const wrapper = mountForm<CommonFieldsValues>(getCommonFields());
    const formElement = wrapper.find('form');

    expect(formElement.findAll('.default-field-class')).toHaveLength(4);
    expect(formElement.findAll('[aria-label="test"]')).toHaveLength(4);
  });

  it('makes fields lazy by default', () => {
    formBuilder.defaults.value.fieldDefaults.lazy = true;

    const form = generateForm<CommonFieldsValues>(getCommonFields());
    expect(form.model.field.lazy).toBe(true);
  });

  it('makes fields optional by default', () => {
    formBuilder.defaults.value.fieldDefaults.optional = true;

    const form = generateForm<CommonFieldsValues>(getCommonFields());
    expect(form.model.field.isOptional.value).toBe(true);
  });

  it('calls renderLabel if defined when rendering a label', () => {
    expect.assertions(1);
    const renderLabel = vi.fn((value: string): string => value.toUpperCase());

    formBuilder.defaults.value.renderLabel = renderLabel;

    const form = generateForm<CommonFieldsValues>(getCommonFields());
    mount(MagicForm, {props: {form}});

    expect(renderLabel).toHaveBeenCalledTimes(2);
  });

  it('renders element prop if it is turned on', () => {
    const wrapper = mountForm<CommonFieldsValues>(getCommonFields());

    const input = wrapper.findComponent(mockComponent);

    expect(input.props('element')).toBeInstanceOf(Field);
  });

  it('does not render element prop if it is turned off', () => {
    formBuilder.defaults.value.field.elementProp = false;

    const wrapper = mountForm<CommonFieldsValues>(getCommonFields());

    const input = wrapper.findComponent(mockComponent);

    expect(input.props('element')).toBeUndefined();
  });

  it('renders content in slot of element', () => {
    const wrapper = mountForm([
      {
        component: h('div'),
        slots: {
          default: () => h('p', 'appelboom'),
        },
      },
    ]);

    const paragraph = wrapper.find('p');

    expect(paragraph.text()).toBe('appelboom');
  });

  describe('setValue', () => {
    it('sets the value of a single field', async () => {
      expect.assertions(1);
      const form = generateForm<CommonFieldsValues>(getCommonFields());
      form.setValue('field', '12345');
      await flushPromises();

      expect(reactive(form.values)).toEqual({field: '12345', field2: ''});
    });

    it('does nothing if field does not exist', async () => {
      expect.assertions(1);
      const form = generateForm<CommonFieldsValues>(getCommonFields());
      form.setValue('does-not-exist', 'boo');
      await flushPromises();

      expect(reactive(form.values)).toEqual({field: '', field2: ''});
    });
  });

  describe('setValues', () => {
    it('sets the value of multiple fields', async () => {
      expect.assertions(1);
      const form = generateForm<CommonFieldsValues>(getCommonFields());
      form.setValues({field: 'bye', field2: 'hello'});
      await flushPromises();

      expect(reactive(form.values)).toEqual({field: 'bye', field2: 'hello'});
    });

    it('ignores fields that do not exist', async () => {
      expect.assertions(1);
      const form = generateForm<CommonFieldsValues>(getCommonFields());
      form.setValues({field: 'value', wee: '3', field2: 'hi'});
      await flushPromises();

      expect(reactive(form.values)).toEqual({field: 'value', field2: 'hi'});
    });
  });
});
