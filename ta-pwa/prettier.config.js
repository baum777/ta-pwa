/**** Prettier config ****/
/** @type {import('prettier').Config} */
export default {
  semi: false,
  singleQuote: true,
  trailingComma: 'all',
  printWidth: 100,
  plugins: [
    '@ianvs/prettier-plugin-sort-imports',
  ],
  importOrder: [
    '^react$',
    '^react-.*',
    '<THIRD_PARTY_MODULES>',
    '',
    '^@/(.*)$',
    '^[./]'
  ],
}