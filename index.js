const prettier = require('prettier')

const prettify = source =>
  prettier.format(source, {
    printWidth: 80,
    tabWidth: 2,
    singleQuote: true,
    trailingComma: 'es5',
    bracketSpacing: true,
    jsxBracketSameLine: true,
    parser: 'babylon',
  })

const alwaysAString = (s = '') => s

const compose = (...args) => a => args.reduceRight((acc, func) => func(acc), a)

const replace = (exp, repl) => s => s.replace(exp, repl)

const removeSemi = replace(/[ 	;]+([\n\r])/gmi, '$1')

const moveImportantSemi = replace(/(;)([\n\r 	]*)([\[`\(])/gmi, '$2$1$3')

const endParenthesisRegex = /(\))[\n\r 	]+(\))/gmi

const formatEndParenthesis = source =>
  !endParenthesisRegex.exec(source)
    ? source
    : formatEndParenthesis(source.replace(endParenthesisRegex, '$1$2'))

module.exports = compose(
  formatEndParenthesis,
  removeSemi,
  moveImportantSemi,
  alwaysAString,
  prettify
)
