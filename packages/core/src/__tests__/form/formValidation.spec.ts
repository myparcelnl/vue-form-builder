import {
  canNotContainLetterValidator,
  firstNameNotJohnValidator,
  nameNotDonald,
  nameNotDonaldMack,
} from './interactive-element/validationData';
import {canNotContainX, firstNameNotDuane} from '@myparcel-vfb/demo/src/forms/validators';
import {defineField, defineForm} from '../../form';
import {describe, expect, it} from 'vitest';
import {flushPromises, mount} from '@vue/test-utils';
import {formIsInvalid, formIsValid} from '../utils/formIsValid';
import {MagicForm} from '../../components';
import SubmitButton from '../elements/SubmitButton.vue';
import TextInput from '../elements/TextInput.vue';
import {generateForm} from '../utils/generateForm';
import {ref} from 'vue';

describe('Form and field validation', () => {
  it('can determine if a text input is valid based on single predicate', async () => {
    expect.assertions(11);
    const firstName = ref('');
    const lastName = ref('');
    const validationForm = defineForm('validationForm', {
      fields: [
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
        defineField({
          component: SubmitButton,
        }),
      ],
    });

    const wrapper = mount(MagicForm, {props: {form: validationForm}});
    const formElement = wrapper.find('form');
    await flushPromises();

    // expect default state to be valid regardless of input
    formIsValid(formElement, validationForm);

    await wrapper.find('#firstName__wrapper input').setValue('Karen');
    expect(firstName.value).toBe('Karen');

    await wrapper.find('#lastName__wrapper input').setValue('Doe');
    expect(lastName.value).toBe('Doe');

    await validationForm.submit();

    const firstNameWarning = wrapper.find('#firstName__wrapper .errors');
    expect(firstNameWarning.exists()).toBe(true);
    expect(firstNameWarning.text()).toBe('Field must start with "J"');

    const lastNameWarning = wrapper.find('#lastName__wrapper .errors');
    expect(lastNameWarning.exists()).toBe(false);

    formIsInvalid(formElement, validationForm);
  });

  it('can determine if a text input is valid based on previous inputs and predicates', async () => {
    const firstName = ref('');
    const lastName = ref('');
    const validationForm = defineForm('validationForm', {
      fields: [
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
          validate: (field, value) => !(field.form.model.firstName.ref === 'Jack' && String(value) === 'McGill'),
          errorMessage: 'Last name cannot be "McGill" if first name is "Jack"',
        }),
        defineField({
          component: SubmitButton,
        }),
      ],
    });
    const wrapper = mount(MagicForm, {props: {form: validationForm}});
    await flushPromises();
    const formElement = wrapper.find('form');
    formIsValid(formElement, validationForm);

    await wrapper.find('#firstName__wrapper input').setValue('Jack');
    await wrapper.find('#lastName__wrapper input').setValue('McGill');

    await validationForm.submit();
    const lastNameWarning = wrapper.find('#lastName__wrapper .errors');
    expect(lastNameWarning.text()).toBe('Last name cannot be "McGill" if first name is "Jack"');

    formIsInvalid(formElement, validationForm);

    await wrapper.find('#lastName__wrapper input').setValue('Taves');

    await validationForm.submit();
    formIsValid(formElement, validationForm);
  });

  it('validates using a single function', async () => {
    expect.assertions(4);

    const form = generateForm([
      defineField({
        component: 'input',
        name: 'element',
        ref: ref(''),
        validate: (_, value) => String(value).startsWith('J'),
        errorMessage: 'Field must start with "J"',
      }),
    ]);

    form.model.element.ref = 'Peter';
    await form.submit();
    expect(form.isValid.value).toBe(false);
    expect(form.model.element.errors).toEqual(['Field must start with "J"']);

    form.model.element.ref = 'Joe Mater';
    await form.submit();
    expect(form.isValid.value).toBe(true);
    expect(form.model.element.errors).toEqual([]);
  });

  it('moves the erorr message to another field', async () => {
    expect.assertions(6);

    const form = generateForm([
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

    form.model.element.ref = 'Peter';
    await form.submit();
    expect(form.isValid.value).toBe(false);
    expect(form.model.target.errors.value).toEqual(['Field must start with "J"']);
    expect(form.model.element.errors).toEqual([]);

    form.model.element.ref = 'Joe Mater';
    await form.submit();
    expect(form.isValid.value).toBe(true);
    expect(form.model.target.errors.value).toEqual([]);
    expect(form.model.element.errors).toEqual([]);
  });

  it('validates using an array of validators', async () => {
    expect.assertions(1);

    const form = generateForm({
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

    const form = generateForm({
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

    const form = generateForm({
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
    form.model.element.ref = 'Donald Mack';
    await form.submit();
    expect(form.model.element.errors).toEqual(['Donald Mack, we specifically do not send to you.']);
    form.model.element.ref = 'Donald';
    await form.submit();
    expect(form.model.element.errors).toEqual(['Donald, we do not send to you.']);
  });
});
