import {FormConfiguration, InteractiveElement, PlainElement, defineField} from '../../form';
import {describe, expect, it} from 'vitest';
import TextInput from '../elements/TextInput.vue';
import {generateForm} from '../utils';
import {ref} from 'vue';

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

  const formConfig: FormConfiguration = {
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
      },
    ],
  };

  it('can retrieve an object with all non-disabled keys and values', () => {
    const form = generateForm(formConfig);

    expect(form.getValues()).toEqual({
      named: '',
      val: 23,
      text: 'initial',
    });
  });

  it('can retrieve the value of a field by the field name', () => {
    const form = generateForm(formConfig);

    expect(form.getValue('val')).toBe(23);
    expect(form.getValue('text')).toBe('initial');
    expect(form.getValue('nothing')).toBe(undefined);
  });

  it('can make a field optional based on a predicate', async () => {
    let expectation: boolean;
    const newFormConfig = {...formConfig};
    // specifically make the predicate rely on a field further down the form:
    newFormConfig.fields[0].optionalWhen = (field) => field.form.getValue('val') === 24;

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
});
