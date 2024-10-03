import {describe, afterEach, it, expect} from 'vitest';
import {useFormBuilder} from '../composables/useFormBuilder';
import {generateTestForm} from '../__tests__/utils/generateTestForm';
import {generateFieldName} from './generateFieldName';
import {defineField} from './defineField';

describe('generateFieldName', () => {
  afterEach(() => {
    useFormBuilder().forms.value = {};
  });

  describe.each([
    ['without suffix', undefined],
    ['with suffix', '_test'],
  ])('%s', (_, suffix) => {
    const resolvedSuffix = suffix ? `:${suffix}` : '';

    it('generates a field name from form name + field name', async () => {
      expect.assertions(1);

      const {instance: form} = await generateTestForm([defineField({name: 'testField', component: 'input'})], 'myForm');

      const name = generateFieldName(form.fields.value[0], suffix);

      expect(name).toBe(`myForm:testField${resolvedSuffix}`);
    });

    it('returns undefined if field is undefined', () => {
      expect(generateFieldName(undefined, suffix)).toBe(undefined);
    });

    it('returns undefined if field is null', () => {
      expect(generateFieldName(null, suffix)).toBe(undefined);
    });
  });
});
