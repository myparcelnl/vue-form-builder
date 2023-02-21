import {Form, InteractiveElementInstance, defineForm, getDefaultFormConfiguration} from '../../form';
import {PropType, defineComponent, h, isVNode, ref, vModelText, withDirectives} from 'vue';
import {afterEach, describe, expect, it} from 'vitest';
import {AnyElementConfiguration} from '../../types';
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

describe('defining a form', () => {
  const formBuilder = useFormBuilder();

  afterEach(() => {
    formBuilder.forms.value = Object.create(null);
    formBuilder.defaults.value = getDefaultFormConfiguration();
  });

  it('registers form in the form builder', () => {
    expect(formBuilder.forms.value).toEqual({});

    const form = defineForm('myForm', {fields: commonFields});

    expect(formBuilder.forms.value).toHaveProperty('myForm');
    expect(formBuilder.forms.value.myForm).toBeInstanceOf(Form);
    expect(formBuilder.forms.value.myForm.fields).toHaveLength(form.fields.value.length);
  });

  it('has default values', () => {
    const form = defineForm('myForm', {fields: commonFields});
    const defaults = getDefaultFormConfiguration();

    expect(form.config.form).toEqual(defaults.form);
    expect(form.config.field).toEqual(defaults.field);
    expect(form.config.fieldDefaults).toEqual(defaults.fieldDefaults);
  });

  it('can set default values', () => {
    expect(formBuilder.forms.value).toEqual({});

    formBuilder.setDefaults({
      form: {
        attributes: {
          class: ['form-class'],
        },
        tag: 'div',
      },
      field: {
        wrapper: h('div'),
        elementProp: false,
      },
      fieldDefaults: {
        attributes: {
          class: ['default-class'],
        },
        lazy: true,
        wrapper: false,
      },
    });

    const form = defineForm('myForm', {fields: commonFields});

    for (const field of form.fields.value) {
      expect(field.lazy).toBe(true);
      expect(field.attributes.class).toContain('default-class');
    }

    expect(form.config.form).toEqual({
      attributes: {
        class: ['form-class'],
      },
      tag: 'div',
    });

    expect(form.config.field.elementProp).toBe(false);
    expect(isVNode(form.config.field.wrapper)).toBeTruthy();

    expect(form.config.fieldDefaults).toEqual({
      attributes: {
        class: ['default-class'],
      },
      lazy: true,
      wrapper: false,
    });
  });
});
