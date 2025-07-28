// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/*'],
    rules: {
      'quotes': ['error', 'single'],
      'jsx-quotes': ['error', 'prefer-single'],
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/ban-types': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      'react/display-name': 'off',
      'react-hooks/exhaustive-deps': 'off'
    }
  },
]);
