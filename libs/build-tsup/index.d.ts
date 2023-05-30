import {type Options} from 'tsup';
import {type RecursivePartial} from '@myparcel/ts-utils';

type CreateCommonTsupConfig = (config?: RecursivePartial<Options>) => Options;

declare function createTsupConfig(config?: RecursivePartial<Options>): Options;
