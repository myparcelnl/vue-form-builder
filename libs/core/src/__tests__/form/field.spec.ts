import {h, markRaw, ref, nextTick, toValue} from 'vue';
import {describe, expect, it, vi} from 'vitest';
import {flushPromises, mount} from '@vue/test-utils';
import {optionData, generateTestForm} from '../utils';
import {firstNameNotDuane} from '../examples/validators';
import TextInput from '../elements/TextInput.vue';
import FormGroup from '../elements/FormGroup.vue';
import {defineField, defineForm} from '../../utils';
import MagicForm from '../../components/MagicForm.vue';

describe('Form fields', () => {
  it.skip('can calculate forwards based on primary input', async () => {
    const firstName = ref('');
    const price = ref('0');

    const validationForm = defineForm('validationForm', {
      field: {
        wrapper: markRaw(FormGroup),
      },
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
    expect(price.value).toBe('50');

    await wrapper.find('input[name="firstName"]').setValue('Jack');
    expect(price.value).toBe('100');
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
        afterUpdate: async (field, newValue) => {
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
    expect(price.value).toBe('50');
    await wrapper.find('input[name="firstName"]').setValue('John');

    vi.advanceTimersByTime(1000);
    await flushPromises();
    expect(price.value).toBe('100');
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

    expect(form.isValid.value).toBe(true);
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

  it.skip('can pass through slots', async () => {
    expect.assertions(1);

    const field = defineField({
      component: h('div', () => ['this.$slots']),
      name: 'element',
      ref: ref(''),
      slots: {
        default: () => ['this.element.slots 1', h('div', () => ['this.element.slots 2'])],
      },
    });

    const {instance: form} = await generateTestForm({fields: [field], initialValues: {element: 'hello'}});

    const wrapper = mount(MagicForm, {props: {form}});

    await nextTick();

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('it can invalidate a field', async () => {
    expect.assertions(1);

    const field = defineField({
      component: 'input',
      name: 'element',
      ref: ref(''),
    });

    const {instance: form} = await generateTestForm<{element: string}>([field]);
    const fieldInstance = form.getField('element');
    fieldInstance.setInvalid();

    expect(fieldInstance?.isValid.value).toBe(false);
  });

  it('can add an error to a field', async () => {
    expect.assertions(1);

    const field = defineField({
      component: 'input',
      name: 'element',
      ref: ref(''),
    });

    const {instance: form} = await generateTestForm<{element: string}>([field]);
    const fieldInstance = form.getField('element');
    fieldInstance.addError('error message');

    expect(fieldInstance?.errors.value).toEqual(['error message']);
  });
});
