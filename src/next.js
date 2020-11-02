const { compose } = require('exalted.future')
const prettier = require('prettier')

const prettify = source =>
  prettier.format(source, {
    printWidth: 100,
    tabWidth: 2,
    singleQuote: true,
    trailingComma: 'none',
    bracketSpacing: true,
    jsxBracketSameLine: true,
    parser: 'babylon',
    semi: false
  })

const alwaysAString = s => (s ? String(s) : '')

const replace = exp => repl => s => s.replace(exp, repl)

const rightRegex = /([\)\}])[\n\r 	]+([)\]]+[,]?\n)/gim
const replaceRight = replace(rightRegex)('$1$2')

const formatRight = source =>
  !rightRegex.exec(source) ? source : formatRight(replaceRight(source))

module.exports = compose(
  formatRight,
  alwaysAString,
  prettify
)
