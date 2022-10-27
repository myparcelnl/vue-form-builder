import {FunctionalComponent, h, ref} from 'vue';
import {InteractiveElement, defineForm} from '../../form';
import {describe, expect, it} from 'vitest';
import { mount } from '@vue/test-utils';
import { MagicForm } from '../components';

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

describe('form builder', () => {
  it('works', () => {

    expect(form.model.named).toBeInstanceOf(InteractiveElement);
    expect(form.model.text).toBeInstanceOf(InteractiveElement);

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

  it('can use vue element wrapper', () => {
    const wrapper = mount(MagicForm, {
      props: {
        form,
      },
    });
    const formElement = wrapper.find('form');
    expect(formElement.exists()).toBe(true);
  });
});
