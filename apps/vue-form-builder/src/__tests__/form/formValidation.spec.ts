import {ref} from 'vue';
import {describe, expect, it} from 'vitest';
import {flushPromises, mount} from '@vue/test-utils';
import {generateTestForm} from '../utils/generateTestForm';
import {formIsInvalid, formIsValid} from '../utils/formIsValid';
import {canNotContainX, firstNameNotDuane} from '../examples/validators';
import TextInput from '../elements/TextInput.vue';
import {defineField} from '../../utils/defineField';
import MagicForm from '../../components/MagicForm.vue';
import {
  canNotContainLetterValidator,
  firstNameNotJohnValidator,
  nameNotDonald,
  nameNotDonaldMack,
} from './interactive-element/validationData';

describe('Form and field validation', () => {
  it.skip('can determine if a text input is valid based on single predicate', async () => {
    expect.assertions(11);
    const firstName = ref('');
    const lastName = ref('');
    const {instance: validationForm} = await generateTestForm(
      [
        defineField({
          name: 'firstName',
          component: TextInput,
          ref: firstName,
          validate: (_, value) => String(value).startsWith('J'),
          errorMessage: 'Field must start with "J"',
        }),
        defineField({
          name: 'lastName',
          component: TextInput,
          ref: lastName,
        }),
      ],
      'validationForm',
    );

    const wrapper = mount(MagicForm, {props: {form: validationForm}});
    await flushPromises();

    // expect default state to be valid regardless of input
    formIsValid(validationForm);

    await wrapper.find('input[name="firstName"]').setValue('Karen');
    expect(firstName.value).toBe('Karen');

    await wrapper.find('input[name="lastName"]').setValue('Doe');
    expect(lastName.value).toBe('Doe');

    await validationForm.submit();

    const firstNameWarning = wrapper.findByTest({id: 'firstName', type: 'errors'});
    expect(firstNameWarning.exists()).toBe(true);
    expect(firstNameWarning.text()).toBe('Field must start with "J"');

    const lastNameWarning = wrapper.findByTest({id: 'firstName', type: 'errors'});
    expect(lastNameWarning.exists()).toBe(false);

    formIsInvalid(validationForm);
  });

  it.skip('can determine if a text input is valid based on previous inputs and predicates', async () => {
    const firstName = ref('');
    const lastName = ref('');
    const {instance: validationForm} = await generateTestForm(
      [
        defineField({
          name: 'firstName',
          component: TextInput,
          ref: firstName,
          validate: (_, value) => String(value).startsWith('J'),
          errorMessage: 'Field must start with "J"',
        }),
        defineField({
          name: 'lastName',
          component: TextInput,
          ref: lastName,
          validate: (field, value) => !(field.form.model.firstName.ref.value === 'Jack' && String(value) === 'McGill'),
          errorMessage: 'Last name cannot be "McGill" if first name is "Jack"',
        }),
      ],
      'validationForm',
    );

    const wrapper = mount(MagicForm, {props: {form: validationForm}});
    await flushPromises();
    formIsValid(validationForm);

    await wrapper.findByTest({id: 'firstName', type: 'interactive'}).setValue('Jack');
    await wrapper.findByTest({id: 'lastName', type: 'interactive'}).setValue('McGill');

    await validationForm.submit();
    expect(wrapper.html()).toMatchSnapshot();
    const lastNameWarning = wrapper.findByTest({id: 'lastName', type: 'errors'});
    expect(lastNameWarning.text()).toBe('Last name cannot be "McGill" if first name is "Jack"');

    formIsInvalid(validationForm);

    await wrapper.find('input[name="lastName"]').setValue('Taves');

    await validationForm.submit();
    formIsValid(validationForm);
  });

  it('validates using a single function', async () => {
    expect.assertions(4);

    const {instance: form} = await generateTestForm([
      defineField({
        component: 'input',
        name: 'element',
        ref: ref(''),
        validate: (_, value) => String(value).startsWith('J'),
        errorMessage: 'Field must start with "J"',
      }),
    ]);

    form.model.element.ref.value = 'Peter';
    await form.submit();
    expect(form.isValid.value).toBe(false);
    expect(form.model.element.errors.value).toEqual(['Field must start with "J"']);

    form.model.element.ref.value = 'Joe Mater';
    await form.submit();
    expect(form.isValid.value).toBe(true);
    expect(form.model.element.errors.value).toEqual([]);
  });

  it.skip('moves the error message to another field', async () => {
    expect.assertions(6);

    const {instance: form} = await generateTestForm([
      defineField({
        component: 'div',
        name: 'target',
      }),
      defineField({
        component: 'input',
        name: 'element',
        ref: ref(''),
        validate: (_, value) => String(value).startsWith('J'),
        errorMessage: 'Field must start with "J"',
        errorsTarget: 'target',
      }),
    ]);

    form.model.element.ref.value = 'Peter';
    await form.submit();
    await flushPromises();
    expect(form.isValid.value).toBe(false);
    expect(form.model.target.errors.value).toEqual(['Field must start with "J"']);
    expect(form.model.element.errors.value).toEqual([]);

    form.model.element.ref.value = 'Joe Mater';
    await form.submit();
    await flushPromises();
    expect(form.isValid.value).toBe(true);
    expect(form.model.target.errors.value).toEqual([]);
    expect(form.model.element.errors.value).toEqual([]);
  });

  it('validates using an array of validators', async () => {
    expect.assertions(1);

    const {instance: form} = await generateTestForm({
      fields: [
        defineField({
          component: 'input',
          name: 'element',
          ref: ref('Jack'),
          validators: [firstNameNotJohnValidator(), canNotContainLetterValidator()],
        }),
      ],
    });

    await form.submit();
    expect(form.isValid.value).toBe(true);
  });

  it('validates using a computed validator', async () => {
    expect.assertions(1);

    const {instance: form} = await generateTestForm({
      fields: [
        defineField({
          component: 'input',
          name: 'element',
          ref: ref('Jack'),
          validators: [firstNameNotDuane(), canNotContainX()],
        }),
      ],
    });

    await form.submit();
    expect(form.isValid.value).toBe(true);
  });

  it('validates using an array of validators, with precedence', async () => {
    expect.assertions(3);

    const {instance: form} = await generateTestForm({
      fields: [
        defineField({
          component: 'input',
          name: 'element',
          ref: ref('Jack'),
          validators: [
            // validators without precedence:
            firstNameNotJohnValidator(),
            canNotContainLetterValidator(),
            // validators with precedence:
            nameNotDonaldMack(1),
            nameNotDonald(2),
          ],
        }),
      ],
    });

    await form.submit();
    expect(form.isValid.value).toBe(true);
    form.model.element.ref.value = 'Donald Mack';
    await form.submit();
    expect(form.model.element.errors.value).toEqual(['Donald Mack, we specifically do not send to you.']);
    form.model.element.ref.value = 'Donald';
    await form.submit();
    expect(form.model.element.errors.value).toEqual(['Donald, we do not send to you.']);
  });
});
