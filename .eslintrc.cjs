module.exports = {
  root: true,
  extends: ['@myparcel-eslint/eslint-config-esnext', '@myparcel-eslint/eslint-config-prettier'],
  rules: {
    'class-methods-use-this': 'off',
  },
  overrides: [
    {
      files: ['./**/index.ts'],
      plugins: ['sort-exports'],
      rules: {
        'sort-exports/sort-exports': ['warn', {sortDir: 'asc', sortExportKindFirst: 'type'}],
      },
    },
    {
      files: ['./**/*.vue'],
      extends: '@myparcel-eslint/eslint-config-prettier-typescript-vue',
    },
    {
      files: ['./**/*.ts', './**/*.tsx'],
      extends: '@myparcel-eslint/eslint-config-prettier-typescript',
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: ['tsconfig.base.json'],
        extraFileExtensions: ['.vue'],
      },
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
      },
    },
    {
      files: ['./**/*.js', './**/*.cjs', './**/*.mjs'],
      extends: '@myparcel-eslint/eslint-config-node',
    },
    {
      files: ['./**/*.spec.*', './**/*.test.*', './**/__tests__/**/*'],
      rules: {
        '@typescript-eslint/no-magic-numbers': 'off',
        'max-len': 'off',
        'max-lines-per-function': 'off',
        'max-nested-callbacks': 'off',
        'vue/no-bare-strings-in-template': 'off',
      },
    },
  ],
};
