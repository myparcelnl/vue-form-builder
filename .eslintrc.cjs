module.exports = {
  root: true,
  extends: [
    '@myparcel-eslint/eslint-config-esnext',
    '@myparcel-eslint/eslint-config-prettier'
  ],
  overrides: [
    {
      files: ['./**/*.ts'],
      extends: '@myparcel-eslint/eslint-config-prettier-typescript',
    },
    {
      files: [
        './*.cjs',
      ],
      env: {
        node: true,
      },
    },
    {
      files: [
        './test/**/*.ts',
        './src/**/*.spec.ts',
      ],
      rules: {
        '@typescript-eslint/no-magic-numbers': 'off',
        'max-len': 'off',
        'max-lines-per-function': 'off',
      },
    },
    {
      files: [
        './packages/**/src/**/*.vue',
      ],
      extends: '@myparcel-eslint/eslint-config-prettier-typescript-vue',
    },

  ],
};
