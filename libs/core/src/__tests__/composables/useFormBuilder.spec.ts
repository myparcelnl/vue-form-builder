import {describe, expect, it} from 'vitest';
import {DEFAULT_FORM_CONFIGURATION} from '../../form';
import {useFormBuilder} from '../../composables';

describe('useFormBuilder', () => {
  const form = {fields: []};

  it('should register a form', () => {
    const formBuilder = useFormBuilder();

    formBuilder.register('test', form);

    expect(formBuilder.forms).toHaveProperty('test');
  });

  it('should apply defaults to a form', () => {
    const formBuilder = useFormBuilder();
    formBuilder.defaults.value.form.attributes.class = 'test-class';

    formBuilder.register('test', form);

    expect(formBuilder.forms).toHaveProperty('test');
    expect(formBuilder.forms.test.config.form.attributes.class).toBe('test-class');

    formBuilder.defaults.value = DEFAULT_FORM_CONFIGURATION;
  });

  it('should overwrite old form when registering a form with a previously used name', () => {
    const formBuilder = useFormBuilder();
    formBuilder.register('test', form);
    expect(formBuilder.forms.test.config.validationMessages).toBeFalsy();

    const otherForm = {fields: [], validationMessages: {test: 'test'}};
    formBuilder.register('test', otherForm);
    expect(formBuilder.forms.test.config.validationMessages).toEqual({test: 'test'});
  });
});
