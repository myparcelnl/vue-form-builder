import {defineComponent, h, nextTick, Suspense, type DefineComponent} from 'vue';
import {describe, it, expect, afterEach} from 'vitest';
import {render, within, waitFor} from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import FormView from './FormView.vue';

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

const capitalize = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const suspenseWrapper = (componentToWrap: any): DefineComponent => {
  return defineComponent({
    name: 'SuspenseWrapper',
    props: componentToWrap.props,
    emits: componentToWrap.emits,
    render() {
      const props = {
        ...this.$props,
      };
      componentToWrap.emits?.forEach((emit: string) => {
        props[`on${capitalize(emit)}`] = (...args: any[]) => this.$emit(emit, ...args);
      });
      const slots = this.$slots;
      return h(
        'div',
        {id: 'root'},
        h(Suspense, null, {
          default() {
            return h(componentToWrap, props, slots);
          },
          fallback: () => h('div', 'fallback'),
        }),
      );
    },
  });
};

describe('FormView', () => {
  const renderComponent = async () => {
    const component = render(suspenseWrapper(FormView));
    await flushPromises();
    return component;
  };

  it('matches the snapshot', async () => {
    const {html} = await renderComponent();
    expect(html()).toMatchSnapshot();
  });

  it('can fake submit, populating the errors field of Form2', async () => {
    const user = userEvent.setup();
    const {getAllByRole, getAllByLabelText} = await renderComponent();

    // not sure why it gets two of these:
    const submitButtons = getAllByRole('button', {name: 'Fake submit'});
    const submitButton = submitButtons[0];
    await user.click(submitButton);

    // not sure why it gets two of these:
    const descriptionFields = getAllByLabelText('Description');
    const descriptionField = descriptionFields[0];

    const errors = within(descriptionField.parentElement).getByRole('list');
    const error = within(errors).getByRole('listitem');
    expect(error.innerText).toBe('This is an error from afterSubmit');

    const resetButton = getAllByRole('button', {name: 'Reset!!!'})[0];
    await user.click(resetButton);
  });

  it('can fake submit, populating the errors field of Form', async () => {
    const user = userEvent.setup();
    const {getAllByRole, getAllByLabelText} = await renderComponent();

    // not sure why it gets two of these:
    const submitButtons = getAllByRole('button', {name: 'Fake submit'});
    const submitButton = submitButtons[0];
    await user.click(submitButton);

    // not sure why it gets two of these:
    const lastNameFields = getAllByLabelText('Last name');
    const lastNameField = lastNameFields[0];

    const errors = within(lastNameField.parentElement).getByRole('list');
    const error = within(errors).getByRole('listitem');
    expect(error.innerText).toBe('This is an error from afterSubmit');

    const resetButton = getAllByRole('button', {name: 'Reset!!!'})[0];
    await user.click(resetButton);
  });

  it('can real submit, populating the errors field of Form', async () => {
    const user = userEvent.setup();
    const {getAllByRole, getAllByLabelText} = await renderComponent();

    // not sure why it gets two of these:
    const submitButtons = getAllByRole('button', {name: '🍀Verzenden'});
    const submitButton = submitButtons[0];
    await user.click(submitButton);

    // not sure why it gets two of these:
    const lastNameFields = getAllByLabelText('Last name');
    const lastNameField = lastNameFields[0];

    const errors = within(lastNameField.parentElement).getByRole('list');
    const error = within(errors).getByRole('listitem');
    expect(error.innerText).toBe('Are you kidding me?');
  });
});
