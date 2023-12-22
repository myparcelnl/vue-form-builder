import {defineComponent} from 'vue';
import {describe, afterEach, it, expect} from 'vitest';
import {useFormBuilder} from '../composables';
import {generateForm} from '../__tests__/utils';
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

    it('generates a field name from form name + field name', () => {
      const form = generateForm([defineField({name: 'testField', component: 'input'})], 'myForm');
      const name = generateFieldName(form.fields.value[0], suffix);

      expect(name).toBe(`myForm:testField${resolvedSuffix}`);
    });

    it('generates a field name from form name + html component', () => {
      const form = generateForm([defineField({component: 'input'})], 'myForm');
      const name = generateFieldName(form.fields.value[0], suffix);

      expect(name).toBe(`myForm:input${resolvedSuffix}`);
    });

    it('generates a field name from form name + vue component', () => {
      const component = defineComponent({name: 'MyInput'});
      const form = generateForm([defineField({component})], 'myForm');
      const name = generateFieldName(form.fields.value[0], suffix);

      expect(name).toBe(`myForm:MyInput${resolvedSuffix}`);
    });

    it('returns undefined if field is undefined', () => {
      expect(generateFieldName(undefined, suffix)).toBe(undefined);
    });

    it('returns undefined if field is null', () => {
      expect(generateFieldName(null, suffix)).toBe(undefined);
    });
  });
});
