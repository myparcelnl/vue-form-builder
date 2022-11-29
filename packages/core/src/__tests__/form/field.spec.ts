import {defineField, defineForm} from '../../form';
import {describe, expect, it, vi} from 'vitest';
import {flushPromises, mount} from '@vue/test-utils';
import {h, ref} from 'vue';
import {MagicForm} from '../../components';
import TextInput from '../elements/TextInput.vue';
import {firstNameNotDuane} from '@myparcel-vfb/demo/src/forms/validators';
import {generateForm} from '../utils/generateForm';
import {optionData} from '../utils/externalData';

describe('Form fields', () => {
  it('can calculate forwards based on primary input', async () => {
    const firstName = ref('');
    const price = ref('0');

    const validationForm = defineForm('validationForm', {
      fields: [
        defineField({
          name: 'firstName',
          component: TextInput,
          ref: firstName,
          afterUpdate: (field, newValue) => {
            field.form.model.price.ref = newValue === 'Jack' ? '100' : '50';
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

    await wrapper.find('#firstName__wrapper input').setValue('Hank');
    expect(price.value).toBe('50');

    await wrapper.find('#firstName__wrapper input').setValue('Jack');
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

            field.form.model.price.ref = remote.price;
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
    await wrapper.find('#firstName__wrapper input').setValue('Hank');
    vi.advanceTimersByTime(1000);

    await flushPromises();
    expect(price.value).toBe('50');
    await wrapper.find('#firstName__wrapper input').setValue('John');

    vi.advanceTimersByTime(1000);
    await flushPromises();
    expect(price.value).toBe('100');
    vi.useRealTimers();
  });

  it('can calculate backwards based on primary input, out of a promise', async () => {
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
    await wrapper.find('#firstName__wrapper input').setValue('Hank');
    // figure out how to reverse calculate the price when firstName is updated.
  });

  it.skip('can teleport a field in the same form', async () => {
    // expect.assertions(2);
    const form = generateForm({
      fields: [
        defineField({
          name: 'name',
          component: 'div',
          label: 'name',
          slots: {
            default: h('div', {class: 'flex flex-row gap-2'}, [
              h('div', {id: 'teleport--firstname'}),
              h('div', {id: 'teleport--lastname'}),
            ]),
          },
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
    console.log(wrapper.html());
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
});
