import {describe, expect, it} from 'vitest';
import {flushPromises, mount} from '@vue/test-utils';
import {MagicForm} from '../../components';
import TextInput from '../elements/TextInput.vue';
import {generateForm} from '../utils/generateForm';
import {ref} from 'vue';

describe('defining a form', () => {
  const form = generateForm({
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

  it('can use vue element wrapper', async () => {
    const wrapper = mount(MagicForm, {props: {form}});
    await flushPromises();
    const formElement = wrapper.find('form');
    expect(formElement.exists()).toBe(true);
    expect(formElement.attributes('id')).toBe('form');
    expect(formElement.find('input').exists()).toBe(true);
    expect(formElement.find('br').exists()).toBe(true);
    expect(formElement.find('input[name="text"]').exists()).toBe(true);
    expect(wrapper.html()).toMatchSnapshot();
  });
});
