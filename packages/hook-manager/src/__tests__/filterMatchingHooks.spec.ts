import {describe, expect, it} from 'vitest';
import {filterMatchingHooks} from '../utils/filterMatchingHooks';

describe('filterMatchingHooks', () => {
  it.each([
    [['submit', 'beforeSubmit', 'config', 'afterSubmit'], ['submit'], ['submit', 'beforeSubmit', 'afterSubmit']],
    [
      ['beforeSubmit', 'sanitize'],
      ['submit', 'sanitize'],
      ['beforeSubmit', 'sanitize'],
    ],
    [['submit', 'config', 'sanitize', 'afterSubmit'], [], []],
  ])('should match hooks for case %#', (config, availableHooks, result) => {
    const hooks = config.filter((key) => filterMatchingHooks(availableHooks, key));

    expect(hooks).toEqual(result);
  });
});
