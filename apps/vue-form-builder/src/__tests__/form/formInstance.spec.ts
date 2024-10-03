import {ref, toValue} from 'vue';
import {describe, expect, it} from 'vitest';
import {flushPromises} from '@vue/test-utils';
import {generateTestForm} from '../utils/generateTestForm';
import {type TestFormConfig} from '../types';
import TextInput from '../elements/TextInput.vue';
import {defineField} from '../../utils/defineField';
import {Field} from '../../form/Field';

interface TestFormValues {
  named: string;
  random: string;
  text: string;
  val: number;
}

const createFieldsConfig = () => {
  return {
    fields: [
      {
        name: 'named',
        component: TextInput,
        ref: ref(''),
      },
      {
        name: 'val',
        component: TextInput,
        ref: ref(23),
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
    ] as const,
  } satisfies TestFormConfig<TestFormValues>;
};

describe('Form instance', () => {
  it('creates a reactive model from named elements', async () => {
    expect.assertions(5);

    const {instance: form} = await generateTestForm<{test: string; test2: string}>([
      defineField({
        component: 'input',
        name: 'test',
        ref: ref(''),
      }),
      defineField({
        component: 'input',
        name: 'test2',
        ref: ref(''),
      }),
    ]);

    expect(Object.keys(form.model)).toEqual(['test', 'test2']);
    expect(form.model.test).toBeInstanceOf(Field);
    expect(form.model.test2).toBeInstanceOf(Field);
    expect(form.model.test2.ref.value).toBe('');

    form.model.test2.ref.value = 'changed';
    expect(form.model.test2.ref.value).toBe('changed');
  });

  it('exposes a reactive object with all non-disabled keys and values', async () => {
    expect.assertions(1);
    const {instance: form} = await generateTestForm<TestFormValues>(createFieldsConfig());

    expect(form.values).toEqual({
      named: '',
      val: 23,
      text: 'initial',
    });
  });

  it('can retrieve the value of a field by the field name', async () => {
    expect.assertions(2);
    const {instance: form} = await generateTestForm<TestFormValues>(createFieldsConfig());

    expect(form.values.val).toBe(23);
    expect(form.values.text).toBe('initial');
  });

  it('can set the value of a field by the field name', async () => {
    const {instance: form} = await generateTestForm<TestFormValues>(createFieldsConfig());

    expect(form.values.val).toBe(23);
    form.setValue('val', 42);
    await flushPromises();
    expect(form.values.val).toBe(42);
  });

  it('can set multiple field values by name', async () => {
    expect.assertions(4);
    const {instance: form} = await generateTestForm<TestFormValues>(createFieldsConfig());

    expect(form.values.val).toBe(23);
    expect(form.values.text).toBe('initial');

    form.setValues({
      val: 42,
      text: 'changed',
    });
    await flushPromises();

    expect(form.values.val).toBe(42);
    expect(form.values.text).toBe('changed');
  });

  it('can make a field optional based on a predicate', async () => {
    expect.assertions(3);

    const config = {
      fields: [
        // specifically make the predicate rely on a field further down the form:
        defineField({
          name: 'named',
          component: TextInput,
          ref: ref(0),
          optionalWhen(field) {
            return toValue(field.form.model?.val?.ref) === 24;
          },
        }),
        defineField({
          name: 'val',
          component: TextInput,
          ref: ref(4),
        }),
      ],
    } satisfies TestFormConfig<{named: string; val: string}>;

    const {instance: form} = await generateTestForm(config);

    // at start, it is not optional
    expect(toValue(form.model.named?.isOptional)).toBe(false);

    form.model.val.ref.value = 24;

    await form.submit();

    expect(toValue(form.model?.named?.isOptional)).toBe(true);

    // change it back, will be optional again
    form.model.val.ref.value = 23;

    await form.submit();
    await flushPromises();
    expect(toValue(form.model?.named?.isOptional)).toBe(false);
  });

  describe('isDirty', () => {
    it('is false when the form is not dirty', async () => {
      expect.assertions(1);
      const {instance: form} = await generateTestForm<TestFormValues>(createFieldsConfig());

      expect(toValue(form.isDirty)).toBe(false);
    });

    it('is true when the form is dirty', async () => {
      expect.assertions(2);
      const {instance: form} = await generateTestForm<TestFormValues>(createFieldsConfig());

      expect(toValue(form.isDirty)).toBe(false);

      form.model.named.ref.value = 'changed';
      await flushPromises();
      expect(toValue(form.isDirty)).toBe(true);
    });

    it.todo('reverts to false when the form is submitted', async () => {
      expect.assertions(3);
      const {instance: form} = await generateTestForm<TestFormValues>(createFieldsConfig());

      form.model.named.ref.value = 'changed';
      await flushPromises();
      expect(toValue(form.isDirty)).toBe(true);

      await form.submit();
      expect(toValue(form.isDirty)).toBe(false);
    });

    it.todo('reverts to false when the form is reset', async () => {
      expect.assertions(3);
      const {instance: form} = await generateTestForm<TestFormValues>(createFieldsConfig());

      form.model.named.ref.value = 'changed';
      await flushPromises();
      expect(toValue(form.isDirty)).toBe(true);

      await form.reset();
      expect(toValue(form.isDirty)).toBe(false);
    });
  });
});
