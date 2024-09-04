import {defineComponent, h, nextTick, ref} from 'vue';
import {describe, it, expect, afterEach} from 'vitest';
import {render, waitFor} from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import {type FormInstance} from '@myparcel/vue-form-builder';
import {createForm} from '@myparcel/vue-form-builder';
import MiddleName from './MiddleName.vue';

/* c8 ignore next */
const scheduler = typeof setImmediate === 'function' ? setImmediate : setTimeout;

/**
 * flushPromises implementation as described in https://github.com/kentor/flush-promises
 * Identical function as is used in vue-test-utils.
 * @returns {Promise<void>}
 */
export const flushPromises = (): Promise<void> => {
  return new Promise((resolve) => {
    scheduler(resolve);
  });
};

describe('Middle Name', () => {
  let Form;

  const mountForm = async () => {
    Form = createForm('middle-name-form', {});

    const FormComponent = defineComponent({
      name: 'MockPage',
      render() {
        return h(Form.Component, () => h(MiddleName));
      },
    });

    const component = render(FormComponent);

    await flushPromises();
    return component;
  };

  it('should render a pre-populated form, transform inserted form fields', async () => {
    const {html} = await mountForm();
    expect(html()).toMatchSnapshot();

    const middleName = Form.instance.getField('middleName');

    console.log('middleName', middleName.isOptional);
  });
});
