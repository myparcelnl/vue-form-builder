import {DOMWrapper} from '@vue/test-utils';

declare module '@vue/test-utils' {
  type TestInput = string | (Record<string, string> & {id?: string; type?: string});

  export class VueWrapper {
    public findByTest<T extends Element = Element>(input: TestInput): DOMWrapper<T>;

    public findAllByTest<T extends Element = Element>(input: TestInput): DOMWrapper<T>[];
  }
}
