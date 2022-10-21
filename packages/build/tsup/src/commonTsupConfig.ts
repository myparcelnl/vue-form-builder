import {Options} from 'tsup';

const banner: string | undefined = (process.env.NX_TASK_TARGET_PROJECT + ' ' + process.env.npm_package_version).trim();

export const commonTsupConfig: Options = {
  banner: {
    js: banner?.length ? `/* ${banner} */` : '',
  },
  clean: true,
  dts:
    process.env.NODE_ENV === 'development'
      ? {
          entry: 'src/index.ts',
        }
      : false,
  entry: ['src/index.ts'],
  format: ['esm'],
  loader: {
    '.vue': 'copy',
  },
  env: {
    NODE_ENV: process.env.NODE_ENV ?? '',
  },
  outDir: 'lib',
  shims: true,
  target: 'es2022',
};
