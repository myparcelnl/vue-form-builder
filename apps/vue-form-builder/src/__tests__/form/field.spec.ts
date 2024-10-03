import {markRaw, ref, toValue} from 'vue';
import {describe, expect, it, vi} from 'vitest';
import {flushPromises, mount} from '@vue/test-utils';
import {generateTestForm} from '../utils/generateTestForm';
import {optionData} from '../utils/externalData';
import {firstNameNotDuane} from '../examples/validators';
import TextInput from '../elements/TextInput.vue';
import FormGroup from '../elements/FormGroup.vue';
import {defineForm} from '../../utils/defineForm';
import {defineField} from '../../utils/defineField';
import MagicForm from '../../components/MagicForm.vue';

describe('Form fields', () => {
  it.skip('can calculate forwards based on primary input', async () => {
    const firstName = ref('');
    const price = ref('0');

    const validationForm = defineForm('validationForm', {
      field: {
        wrapper: markRaw(FormGroup),
      },
      // @ts-expect-error todo
      fields: [
        defineField({
          name: 'firstName',
          component: TextInput,
          ref: firstName,
          afterUpdate: (field, newValue) => {
            field.form.model.price.ref.value = newValue === 'Jack' ? '100' : '50';
          },
        }),
        defineField({
          name: 'price',
          component: TextInput,
          ref: price,
        }),
      ],
    });

    const wrapper = mount(MagicForm, {props: {form: validationForm}});
    await flushPromises();

    await wrapper.find('input[name="firstName"]').setValue('Hank');
    expect(toValue(price)).toBe('50');

    await wrapper.find('input[name="firstName"]').setValue('Jack');
    expect(toValue(price)).toBe('100');
  });

  it('can calculate forwards based on primary input, out of a promise', async () => {
    expect.assertions(2);
    vi.useFakeTimers();

    const firstName = ref('');
    const price = ref('0');

    const {instance: validationForm} = await generateTestForm([
      defineField({
        name: 'firstName',
        component: TextInput,
        ref: firstName,
        afterUpdate: async (field, newValue: string) => {
          const remote = await optionData(newValue);

          field.form.model.price.ref.value = remote.price;
        },
      }),
      defineField({
        name: 'price',
        component: TextInput,
        ref: price,
      }),
    ]);

    const wrapper = mount(MagicForm, {props: {form: validationForm}});
    await flushPromises();
    await wrapper.find('input[name="firstName"]').setValue('Hank');
    vi.advanceTimersByTime(1000);

    await flushPromises();
    expect(toValue(price)).toBe('50');
    await wrapper.find('input[name="firstName"]').setValue('John');

    vi.advanceTimersByTime(1000);
    await flushPromises();
    expect(toValue(price)).toBe('100');
    vi.useRealTimers();
  });

  it.skip('can calculate backwards based on primary input, out of a promise', async () => {
    vi.useFakeTimers();
    const firstName = ref('');
    const price = ref('0');

    const {instance: validationForm} = await generateTestForm(
      [
        defineField({
          name: 'firstName',
          component: TextInput,
          ref: firstName,
        }),
        defineField({
          name: 'price',
          component: TextInput,
          ref: price,
        }),
      ],
      'validationForm',
    );

    const wrapper = mount(MagicForm, {props: {form: validationForm}});
    await flushPromises();

    await wrapper.find('input[name="firstName"]').setValue('Hank');
    // figure out how to reverse calculate the price when firstName is updated.
  });

  it('can be reset', async () => {
    expect.assertions(1);

    const field = defineField({
      component: 'input',
      name: 'element',
      ref: ref(''),
      validators: [firstNameNotDuane()],
    });

    const {instance: form} = await generateTestForm<{element: string}>([field]);

    await form.model.element.reset();

    expect(toValue(form.isValid)).toBe(true);
  });

  it('gets filled with initial data from form config', async () => {
    expect.assertions(2);

    const {instance: form} = await generateTestForm({
      fields: [
        defineField({component: 'input', name: 'element', ref: ref('disregarded')}),
        defineField({component: 'input', name: 'toggle', ref: ref()}),
      ],
      initialValues: {element: 'hello', toggle: false},
    });

    expect(toValue(form.model.element.ref)).toBe('hello');
    expect(toValue(form.model.toggle.ref)).toBe(false);
  });

  it('it can invalidate a field', async () => {
    expect.assertions(1);

    const field = defineField({
      component: 'input',
      name: 'element',
      ref: ref(''),
    });

    const {instance: form} = await generateTestForm<{element: string}>([field]);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const fieldInstance = form.getField('element')!;
    fieldInstance.setInvalid();

    expect(toValue(fieldInstance?.isValid)).toBe(false);
  });

  it('can add an error to a field', async () => {
    expect.assertions(1);

    const field = defineField({
      component: 'input',
      name: 'element',
      ref: ref(''),
    });

    const {instance: form} = await generateTestForm<{element: string}>([field]);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const fieldInstance = form.getField('element')!;
    fieldInstance.addError('error message');

    expect(toValue(fieldInstance?.errors)).toEqual(['error message']);
  });
});
