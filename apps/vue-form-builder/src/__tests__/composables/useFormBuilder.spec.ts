import {describe, expect, it} from 'vitest';
import {getDefaultFormConfiguration} from '../../utils/getDefaultFormConfiguration';
import {type FormConfiguration} from '../../types/form.types';
import {useFormBuilder} from '../../composables/useFormBuilder';

describe('useFormBuilder', () => {
  const form = {} satisfies FormConfiguration;

  it('should register a form', () => {
    const formBuilder = useFormBuilder();

    formBuilder.register('test', form);

    expect(formBuilder.forms.value).toHaveProperty('test');
  });

  it('should apply defaults to a form', () => {
    const formBuilder = useFormBuilder();
    formBuilder.defaults.value.form.attributes.class = 'test-class';

    formBuilder.register('test', form);

    expect(formBuilder.forms.value).toHaveProperty('test');
    expect(formBuilder.forms.value.test.config.form.attributes.class).toBe('test-class');

    formBuilder.defaults.value = getDefaultFormConfiguration();
  });

  it('should overwrite old form when registering a form with a previously used name', () => {
    const formBuilder = useFormBuilder();
    formBuilder.register('test', form);
    expect(formBuilder.forms.value.test.config.validationMessages).toBeFalsy();

    const otherForm = {fields: [], validationMessages: {test: 'test'}};
    formBuilder.register('test', otherForm);
    expect(formBuilder.forms.value.test.config.validationMessages).toEqual({test: 'test'});
  });
});
