module.exports = {
  root: true,
  env: {
    'vue/setup-compiler-macros': true,
  },
  extends: [
    '@myparcel/eslint-config/preset-vue3',
    '@vue/eslint-config-typescript/recommended',
    '@vue/eslint-config-prettier',
  ],
  'rules': {
    'vue/no-undef-components': [
      'error', {
        'ignorePatterns': [
          'Pdk(?:[A-Z][a-z]+)+',
        ],
      },
    ],
    'vue/valid-model-definition': 'off',
    // '@typescript-eslint/await-thenable': 'off',
    // '@typescript-eslint/naming-convention': 'off',
    // '@typescript-eslint/no-implied-eval': 'off',
    // '@typescript-eslint/no-floating-promises': 'off',
    // '@typescript-eslint/no-misused-promises': 'off',
    // '@typescript-eslint/no-unnecessary-qualifier': 'off',
    // '@typescript-eslint/no-unnecessary-type-arguments': 'off',
    // '@typescript-eslint/no-unnecessary-type-assertion': 'off',
    // '@typescript-eslint/prefer-includes': 'off',
    // '@typescript-eslint/require-await': 'off',

    'class-methods-use-this': 'off',
    'jsdoc/require-param': 'off',
    'jsdoc/require-returns': 'off',
    'prettier/prettier': [
      'warn',
      {
        'printWidth': 120,
      },
    ],
    'babel/object-curly-spacing': 'off',
    'no-void': 'off',
    '@typescript-eslint/space-before-function-paren': [
      'warn',
      {
        'anonymous': 'never',
        'named': 'never',
        'asyncArrow': 'always',
      },
    ],
    '@typescript-eslint/consistent-type-definitions': 'off',
    '@typescript-eslint/member-ordering': [
      'warn',
      {
        'default': [
          'public-field',
          'protected-field',
          'private-field',

          'public-get',
          'public-set',
          'protected-get',
          'protected-set',
          'private-get',
          'private-set',

          'public-method',
          'protected-method',
          'private-method',
        ],
      },
    ],
  },
  'overrides': [
    {
      'files': [
        './**/*.js',
        './**/*.ts',
      ],
      'env': {
        'node': true,
      },
    },
    {
      'files': [
        './test/**/*.ts',
        './src/**/*.spec.ts',
      ],
      'rules': {
        '@typescript-eslint/no-magic-numbers': 'off',
        'max-len': 'off',
        'max-lines-per-function': 'off',
      },
    },
  ],
};
