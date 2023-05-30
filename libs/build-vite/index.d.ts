import {type UserConfigExport} from 'vitest/dist/config';
import {type UserConfigFn} from 'vitest/config';
import {type PromiseOr, type RecursivePartial} from '@myparcel/ts-utils';

declare function createViteConfig(config?: PromiseOr<RecursivePartial<UserConfigExport>>): UserConfigFn;
