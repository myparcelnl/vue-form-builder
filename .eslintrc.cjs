module.exports = {
  root: true,
  extends: ['@myparcel-eslint/eslint-config-esnext', '@myparcel-eslint/eslint-config-prettier'],
  overrides: [
    {
      files: ['./**/*.ts', './**/*.tsx'],
      extends: '@myparcel-eslint/eslint-config-prettier-typescript',
    },
    {
      files: ['./packages/**/src/**/*.vue'],
      extends: '@myparcel-eslint/eslint-config-prettier-typescript-vue',
    },
    {
      files: ['./**/*.cjs', './**/*.js', './**/*.mjs'],
      extends: '@myparcel-eslint/eslint-config-node',
    },
    {
      files: ['./**/*.spec.*', './**/*.test.*', './**/__tests__/**'],
      rules: {
        '@typescript-eslint/no-magic-numbers': 'off',
        'max-len': 'off',
        'max-lines-per-function': 'off',
      },
    },
  ],
};
