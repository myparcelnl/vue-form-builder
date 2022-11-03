import {describe, expect, it} from 'vitest';
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
    formBuilder.defaults.value = {formClass: 'test-class'};

    formBuilder.register('test', form);

    expect(formBuilder.forms).toHaveProperty('test');
    expect(formBuilder.forms.test.config.formClass).toBe('test-class');
  });

  it('should overwrite old form when registering a form with a previously used name', () => {
    const formBuilder = useFormBuilder();
    formBuilder.register('test', form);
    expect(formBuilder.forms.test.config.formClass).toBe(undefined);

    const otherForm = {fields: [], formClass: 'other-class'};
    formBuilder.register('test', otherForm);
    expect(formBuilder.forms.test.config.formClass).toBe('other-class');
  });
});
