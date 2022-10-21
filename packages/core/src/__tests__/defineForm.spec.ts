import {Field, defineForm} from '../form';
import {FunctionalComponent, h, ref} from 'vue';
import {describe, expect, it} from 'vitest';

describe('form builder', () => {
  it('works', () => {
    const TextInput: FunctionalComponent<{modelValue: string}> = (props, ctx) => {
      return h('input', {
        value: props.modelValue,
        onInput: (event) => {
          ctx.emit('update:modelValue', event.target.value);
        },
      });
    };

    TextInput.props = ['modelValue'];

    const form = defineForm('test', {
      fields: [
        {
          name: 'named',
          component: 'input',
        },
        {
          component: 'br',
        },
        {
          name: 'text',
          component: TextInput,
          ref: ref('initial'),
        },
      ],
    });

    expect(form.model.named).toBeInstanceOf(Field);
    expect(form.model.text).toBeInstanceOf(Field);

    expect(form.model.text.ref).toEqual('initial');

    form.model.text.ref = 'changed';
    expect(form.model.text.ref).toEqual('changed');

    // expect(form.registeredHooks).toEqual([]);
    // expect(form.fields).toEqual({
    //   toggle: {
    //     component: CustomCheckbox,
    //   },
    // });
  });
});