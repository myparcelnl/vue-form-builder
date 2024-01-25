import {ref, toValue} from 'vue';
import {describe, expect, it} from 'vitest';
import {flushPromises} from '@vue/test-utils';
import {generateForm} from '../utils';
import TextInput from '../elements/TextInput.vue';
import {defineField} from '../../utils';
import {type FormConfiguration, type InteractiveElementConfiguration} from '../../types';
import {PlainElement, InteractiveElement} from '../../form';

describe('Form instance', () => {
  it('creates a reactive model from named elements', () => {
    const form = generateForm([
      defineField({
        component: 'input',
      }),
      defineField({
        component: 'input',
        name: 'test',
      }),
      defineField({
        component: 'input',
        ref: ref(''),
        name: 'test2',
      }),
    ]);

    expect(Object.keys(form.model)).toEqual(['test', 'test2']);
    expect(form.model.test).toBeInstanceOf(PlainElement);
    expect(form.model.test2).toBeInstanceOf(InteractiveElement);
    expect(form.model.test2.ref.value).toBe('');
    form.model.test2.ref.value = 'changed';
    expect(form.model.test2.ref.value).toBe('changed');
  });

  const createFormConfig = (): FormConfiguration => ({
    fields: [
      {
        name: 'named',
        component: 'input',
        ref: ref(''),
      },
      {
        name: 'val',
        component: 'input',
        ref: ref(23),
      },
      {
        component: 'br',
      },
      {
        name: 'random',
        component: TextInput,
        ref: ref('this is my value'),
        disabled: true,
      },
      {
        name: 'text',
        component: TextInput,
        ref: ref('initial'),
        readOnly: true,
      },
    ],
  });

  it('can retrieve an object with all non-disabled keys and values', () => {
    const form = generateForm(createFormConfig());

    expect(form.getValues()).toEqual({
      named: '',
      val: 23,
      text: 'initial',
    });
  });

  it('exposes a reactive object with all non-disabled keys and values', () => {
    const form = generateForm(createFormConfig());

    expect(form.values).toEqual({
      named: '',
      val: 23,
      text: 'initial',
    });
  });

  it('can retrieve the value of a field by the field name', () => {
    const form = generateForm(createFormConfig());

    expect(form.getValue('val')).toBe(23);
    expect(form.getValue('text')).toBe('initial');
    expect(() => form.getValue('nothing')).toThrow();
  });

  it('can set the value of a field by the field name', async () => {
    const form = generateForm(createFormConfig());

    expect(form.getValue('val')).toBe(23);
    form.setValue('val', 42);
    expect(form.getValue('val')).toBe(42);
  });

  it('can set multiple field values by name', async () => {
    const form = generateForm(createFormConfig());

    expect(form.getValue('val')).toBe(23);
    expect(form.getValue('text')).toBe('initial');

    form.setValues({
      val: 42,
      text: 'changed',
    });

    expect(form.getValue('val')).toBe(42);
    expect(form.getValue('text')).toBe('changed');
  });

  it('can make a field optional based on a predicate', async () => {
    let expectation: boolean;
    const newFormConfig = createFormConfig();
    // specifically make the predicate rely on a field further down the form:
    (newFormConfig.fields as InteractiveElementConfiguration[])[0].optionalWhen = (field) =>
      field.form.getValue('val') === 24;

    newFormConfig.afterSubmit = (form) => {
      expect(form.fields.value[0].isOptional).toBe(expectation);
    };

    const form = generateForm(newFormConfig);

    // at start, it is not optional
    expect(form.fields.value[0].isOptional).toBe(false);

    form.fields.value[1].ref = 24;
    expectation = true;
    await form.submit();

    // change it back, will be optional again
    form.fields.value[1].ref = 23;
    expectation = false;
    await form.submit();
  });

  describe('isDirty', () => {
    it('is false when the form is not dirty', () => {
      const form = generateForm(createFormConfig());

      expect(toValue(form.isDirty)).toBe(false);
    });

    it('is true when the form is dirty', async () => {
      expect.assertions(2);
      const form = generateForm(createFormConfig());

      expect(toValue(form.isDirty)).toBe(false);

      form.model.named.ref.value = 'changed';
      await flushPromises();
      expect(toValue(form.isDirty)).toBe(true);
    });

    it.todo('reverts to false when the form is submitted', async () => {
      expect.assertions(3);
      const form = generateForm(createFormConfig());

      form.model.named.ref.value = 'changed';
      await flushPromises();
      expect(toValue(form.isDirty)).toBe(true);

      await form.submit();
      expect(toValue(form.isDirty)).toBe(false);
    });

    it.todo('reverts to false when the form is reset', async () => {
      expect.assertions(3);
      const form = generateForm(createFormConfig());

      form.model.named.ref.value = 'changed';
      await flushPromises();
      expect(toValue(form.isDirty)).toBe(true);

      await form.reset();
      expect(toValue(form.isDirty)).toBe(false);
    });
  });
});
