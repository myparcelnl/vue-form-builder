import {type PromiseOr, isOfType} from '@myparcel-dev/ts-utils';

export const toPromise = <T>(value: PromiseOr<T>): Promise<T> =>
  isOfType<Promise<T>>(value, 'then') ? value : Promise.resolve(value);
