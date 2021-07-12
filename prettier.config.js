module.exports = {
  parser: 'typescript',
  endOfLine: 'auto',
  semi: true,
  trailingComma: 'none',
  singleQuote: true,
  printWidth: 80,
  tabWidth: 2,
  arrowParens: 'avoid',
  overrides: [
    {
      files: '*.{json}',
      options: {
        parser: 'json'
      }
    },
    {
      files: '*.md',
      options: {
        parser: 'markdown'
      }
    }
  ]
};
