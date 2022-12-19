import {Options} from 'tsup';

const banner: string = `${process.env.NX_TASK_TARGET_PROJECT} ${process.env.npm_package_version}`.trim();

export const commonTsupConfig: Options = {
  banner: {
    js: banner.length ? `/* ${banner} */` : '',
  },
  entry: ['src/index.ts'],
  env: {
    NODE_ENV: process.env.NODE_ENV ?? '',
  },
  format: ['esm'],
  outDir: 'lib',
  target: 'es2022',
  tsconfig: 'tsconfig.build.json',
};
