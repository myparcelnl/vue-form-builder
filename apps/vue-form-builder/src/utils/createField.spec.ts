import {defineComponent, ref, h, markRaw, type PropType} from 'vue';
import {describe, it, expect, afterEach} from 'vitest';
import {flushPromises} from '@vue/test-utils';
import {render, cleanup} from '@testing-library/vue';
import {type FieldInstance} from '../types/field.types';
import {generateTestForm} from '../__tests__/utils/generateTestForm';
import {createForm} from './createForm';
import {createField} from './createField';

describe('createField', () => {
  const testComponent = markRaw(
    defineComponent({
      name: 'test',
      props: {
        element: {type: Object as PropType<FieldInstance>, required: true},
        modelValue: {type: String, required: true},
      },
      render() {
        return h('input', {value: this.modelValue, id: this.element.name});
      },
    }),
  );

  it('creates a field with a html component', () => {
    const field = createField({name: 'test', ref: ref('value'), component: 'input'});

    expect(field).toStrictEqual({
      Component: expect.any(Function),
      Errors: expect.objectContaining({__asyncLoader: expect.any(Function)}),
      Label: expect.objectContaining({__asyncLoader: expect.any(Function)}),
      field: {name: 'test', ref: 'value', component: 'input'},
      ref: 'value',
    });
  });

  it('creates a field with a vue component', () => {
    const field = createField({name: 'test', ref: ref('value2'), component: testComponent});

    expect(field).toStrictEqual({
      Component: expect.any(Function),
      Errors: expect.objectContaining({__asyncLoader: expect.any(Function)}),
      Label: expect.objectContaining({__asyncLoader: expect.any(Function)}),
      field: {name: 'test', ref: 'value2', component: testComponent},
      ref: 'value2',
    });
  });

  describe('rendering inside forms', () => {
    afterEach(() => {
      cleanup();
    });

    it('renders a simple field', async () => {
      expect.assertions(2);
      const form = await generateTestForm({}, 'renderSimple');

      const field = createField({
        name: 'test',
        ref: ref('value2'),
        component: testComponent,
      });

      const wrapper = render(form.Component, {
        slots: {
          default: () => h(field.Component),
        },
      });

      await flushPromises();

      expect(wrapper.html()).toMatchSnapshot();
      expect((await wrapper.findByRole<HTMLInputElement>('textbox')).value).toBe('value2');
    });

    it('renders a modular field', async () => {
      expect.assertions(2);

      const form = createForm('renderModular');
      const field = createField({
        name: 'modularTest',
        label: 'fieldLabel',
        ref: ref('value2'),
        component: testComponent,
      });

      const wrapper = render(form.Component, {
        slots: {
          default: () => h('div', [h(field.Component), h(field.Label), h(field.Errors)]),
        },
      });

      await flushPromises();

      expect(wrapper.html()).toMatchSnapshot();
      expect((await wrapper.findByRole<HTMLInputElement>('textbox')).value).toBe('value2');
    });

    it('should remove the field from the form when unmounted', async () => {
      expect.assertions(2);

      const form = createForm('renderModular');
      const field = createField({
        name: 'modularTest',
        label: 'fieldLabel',
        ref: ref('value2'),
        component: testComponent,
      });

      const wrapper = render(form.Component, {
        slots: {
          default: () => h('div', [h(field.Component), h(field.Label), h(field.Errors)]),
        },
      });

      await flushPromises();

      expect(form.instance.fields.value).toHaveLength(1);

      wrapper.unmount();

      await flushPromises();

      expect(form.instance.fields.value).toHaveLength(0);
    });
  });
});
