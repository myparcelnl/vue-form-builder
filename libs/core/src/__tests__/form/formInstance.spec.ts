import {ref, toValue} from 'vue';
import {describe, expect, it} from 'vitest';
import {flushPromises} from '@vue/test-utils';
import {generateTestForm, generateTestFormAsync} from '../utils';
import {type TestFormConfig} from '../types';
import TextInput from '../elements/TextInput.vue';
import {defineField} from '../../utils';
import {type FieldConfiguration} from '../../types';
import {Field} from '../../form';

type TestFormValues = {
  named: string;
  val: number;
  text: string;
};

const createFieldsConfig = () => {
  return {
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

    const {instance: form} = await generateTestFormAsync([
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
    const {instance: form} = await generateTestFormAsync(createFieldsConfig());

    expect(form.values).toEqual({
      named: '',
      val: 23,
      text: 'initial',
    });
  });

  it('can retrieve the value of a field by the field name', async () => {
    expect.assertions(2);
    const {instance: form} = await generateTestFormAsync(createFieldsConfig());

    expect(form.values.val).toBe(23);
    expect(form.values.text).toBe('initial');
  });

  it('can set the value of a field by the field name', async () => {
    const {instance: form} = await generateTestFormAsync(createFieldsConfig());

    expect(form.values.val).toBe(23);
    form.setValue('val', 42);
    await flushPromises();
    expect(form.values.val).toBe(42);
  });

  it('can set multiple field values by name', async () => {
    expect.assertions(4);
    const {instance: form} = await generateTestFormAsync(createFieldsConfig());

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

    let expectation: boolean;

    const config = {
      ...createFieldsConfig(),
      afterSubmit(form) {
        expect(form.fields.value[0].isOptional).toBe(expectation);
      },
    } satisfies TestFormConfig<TestFormValues>;

    // specifically make the predicate rely on a field further down the form:
    (config.fields[0] as FieldConfiguration).optionalWhen = (field) => field.form.model.val.ref.value === 24;

    const {instance: form} = await generateTestFormAsync(config);

    // at start, it is not optional
    expect(form.model.named.isOptional.value).toBe(false);

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
      const {instance: form} = generateTestForm(createFieldsConfig());

      expect(toValue(form.isDirty)).toBe(false);
    });

    it('is true when the form is dirty', async () => {
      expect.assertions(2);
      const {instance: form} = generateTestForm(createFieldsConfig());

      expect(toValue(form.isDirty)).toBe(false);

      form.model.named.ref.value = 'changed';
      await flushPromises();
      expect(toValue(form.isDirty)).toBe(true);
    });

    it.todo('reverts to false when the form is submitted', async () => {
      expect.assertions(3);
      const {instance: form} = generateTestForm(createFieldsConfig());

      form.model.named.ref.value = 'changed';
      await flushPromises();
      expect(toValue(form.isDirty)).toBe(true);

      await form.submit();
      expect(toValue(form.isDirty)).toBe(false);
    });

    it.todo('reverts to false when the form is reset', async () => {
      expect.assertions(3);
      const {instance: form} = generateTestForm(createFieldsConfig());

      form.model.named.ref.value = 'changed';
      await flushPromises();
      expect(toValue(form.isDirty)).toBe(true);

      await form.reset();
      expect(toValue(form.isDirty)).toBe(false);
    });
  });
});
