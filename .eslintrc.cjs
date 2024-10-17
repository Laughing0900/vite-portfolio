
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    "next/core-web-vitals",
    "next/typescript",
    "prettier",
    "next",
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  rules: {

    '@typescript-eslint/no-unused-vars': "warn",
    '@typescript-eslint/no-explicit-any': "warn"
  },
}
