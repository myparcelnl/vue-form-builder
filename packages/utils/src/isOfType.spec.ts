import {describe, expect, it} from 'vitest';
import {isOfType} from './isOfType';

type MyObjectType = {
  ref: string;
};

describe('isOfType', () => {
  it('checks for value', () => {
    expect(isOfType<MyObjectType>({ref: 'foo'}, 'ref')).toBe(true);
  });

  it('does not match undefined', () => {
    expect(isOfType<MyObjectType>({ref: undefined}, 'ref')).toBe(false);
  });

  it('does not match other', () => {
    expect(isOfType<MyObjectType>('string', 'ref')).toBe(false);
  });
});
