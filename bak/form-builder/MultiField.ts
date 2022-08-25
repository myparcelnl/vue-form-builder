/* eslint-disable @typescript-eslint/ban-ts-comment */

import { ConstructorFieldProperties, Field } from "./Field";

export interface MultiFieldConstructor<T, C> extends ConstructorFieldProperties<T, C> {
  fields: never[];
}

export class MultiField<T, C> extends Field<T, C> {
  fields: Field<T, C>[];

  // @ts-ignore
  constructor({ fields, ...rest }) {
    // @ts-ignore
    super(rest);
    this.fields = fields;
  }

  // @ts-ignore
  async input(value) {
    this.isDirty = false;
    await this.beforeInput?.(value);
    // @ts-ignore
    this.ref[value] = !this.ref[value];
    await this.afterInput?.(value);
  }
}
