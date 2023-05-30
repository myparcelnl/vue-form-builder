module.exports = {
  root: true,
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
      extends: ['@myparcel-eslint/eslint-config-prettier-typescript-vue', '@myparcel-eslint/eslint-config-import'],
      rules: {
        // Disabled because import messes with multiple component blocks, like when using script setup and inheritAttrs.
        'import/first': 'off',
      },
    },
    {
      files: ['./**/*.ts', './**/*.tsx'],
      extends: ['@myparcel-eslint/eslint-config-prettier-typescript', '@myparcel-eslint/eslint-config-import'],
      rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
      },
    },
    {
      files: ['./**/*.js', './**/*.cjs', './**/*.mjs'],
      extends: [
        '@myparcel-eslint/eslint-config-node',
        '@myparcel-eslint/eslint-config-prettier',
        '@myparcel-eslint/eslint-config-esnext',
        '@myparcel-eslint/eslint-config-import',
      ],
    },
    {
      files: ['./**/*.js', './**/*.mjs'],
      parserOptions: {
        sourceType: 'module',
      },
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
