import {InteractiveElement, NamedElement} from '../../../form';
import {canNotContainEValidator, firstNameNotJohnValidator} from './validationData';
import {canNotContainX, firstNameNotDuane} from '@myparcel/vue-form-builder-demo/src/form/validators';
import {describe, expect, it} from 'vitest';
import {generateForm, generateInteractiveElement, generateNamedElement, generatePlainElement} from './helpers';

describe('Form field', () => {
  it('creates a model from fields with names', () => {
    const form = generateForm(
      generatePlainElement(),
      generateNamedElement({name: 'test'}),
      generateInteractiveElement({name: 'test2'}),
    );

    expect(Object.keys(form.model)).toEqual(['test', 'test2']);

    expect(form.model.test).toBeInstanceOf(NamedElement);
    expect(form.model.test2).toBeInstanceOf(InteractiveElement);

    expect(form.model.test2.ref).toBe('');
  });

  it('validates using a single function', async () => {
    expect.assertions(1);

    const form = generateForm(
      generateInteractiveElement({
        validate: (_, value) => String(value).startsWith('J'),
        errorMessage: 'Field must start with "J"',
      }),
    );

    await form.validate();
    expect(form.isValid.value).toBe(false);

    expect(form.model.element.errors).toEqual(['Field must start with "J"']);

    form.model.element.ref = 'Joe Mater';

    await form.validate();

    expect(form.isValid.value).toBe(true);
    expect(form.model.element.errors).toEqual([]);
  });

  it.skip('validates using an array of validators', async () => {
    expect.assertions(1);

    const field = generateInteractiveElement({
      validators: [firstNameNotJohnValidator(), canNotContainEValidator()],
    });

    const form = generateForm(field);

    const valid = await form.validate();

    expect(valid).toBe(true);
  });

  it.skip('validates using a computed validator', async () => {
    expect.assertions(1);

    const form = generateForm(
      generateInteractiveElement({
        validators: [firstNameNotDuane(), canNotContainX()],
      }),
    );

    const result = await form.validate();

    expect(result).toBe(true);
  });

  it.skip('can be reset', () => {
    const form = generateForm(
      generateInteractiveElement({
        validators: [firstNameNotDuane()],
      }),
    );

    form.model.element.reset();

    expect(result).toBe(true);
  });
});
