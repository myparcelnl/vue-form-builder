import {h, markRaw, ref} from 'vue';
import {describe, expect, it, vi} from 'vitest';
import {flushPromises, mount} from '@vue/test-utils';
import {generateForm, optionData} from '../utils';
import {firstNameNotDuane} from '../examples/validators';
import TextInput from '../elements/TextInput.vue';
import FormGroup from '../elements/FormGroup.vue';
import {defineField, defineForm} from '../../form';
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

    const validationForm = defineForm('validationForm', {
      fields: [
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
      ],
    });

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

    const validationForm = defineForm('validationForm', {
      fields: [
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
    });
    const wrapper = mount(MagicForm, {props: {form: validationForm}});
    await flushPromises();

    await wrapper.find('input[name="firstName"]').setValue('Hank');
    // figure out how to reverse calculate the price when firstName is updated.
  });

  it.skip('can teleport a field in the same form', async () => {
    // expect.assertions(2);
    const form = generateForm({
      fields: [
        defineField({
          name: 'name',
          component: h('div', {class: 'flex flex-row gap-2'}, [
            h('div', {id: 'teleport--firstname'}),
            h('div', {id: 'teleport--lastname'}),
          ]),
          label: 'name',
          props: {
            label: 'Naam',
          },
        }),
        defineField({
          name: 'firstname',
          component: 'input',
          ref: ref(''),
          label: 'firstname',
          teleportSelector: '#teleport--firstname',
        }),

        defineField({
          name: 'lastname',
          component: 'input',
          ref: ref(''),
          label: 'lastname',
          teleportSelector: '#teleport--lastname',
        }),
      ],
    });
    const wrapper = mount(MagicForm, {
      global: {
        stubs: {
          teleport: true,
        },
      },
      props: {
        form,
      },
    });
    await flushPromises();
  });

  it('can be reset', async () => {
    expect.assertions(1);

    const field = defineField({
      component: 'input',
      name: 'element',
      ref: ref(''),
      validators: [firstNameNotDuane()],
    });

    const form = generateForm({fields: [field]});

    await form.model.element.reset();

    expect(form.isValid.value).toBe(true);
  });

  it('gets filled with initial data from form config', async () => {
    expect.assertions(1);

    const field = defineField({
      component: 'input',
      name: 'element',
      ref: ref('disregarded'),
    });

    const form = generateForm({fields: [field], initialValues: {element: 'hello'}});

    expect(form.model.element.ref.value).toBe('hello');
  });
});
