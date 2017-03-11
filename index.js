import prettier from 'prettier'

const alwaysAString = (s = '') => s

const compose = (...args) => a => args.reduceRight((acc, func) => func(acc), a)

const replace = (exp, repl) => s => s.replace(exp, repl)

const prettify = (source) =>
  prettier.format(source, {
    printWidth: 100,
    tabWidth: 2,
    singleQuote: false,
    trailingComma: "es5",
    bracketSpacing: true,
    jsxBracketSameLine: true,
    parser: 'babylon'
  })

const removeSemi = replace(';', '')

const removeEolSemi = replace(/;([\n\r])/, '$1')

const insertImportantSemi = replace(/([^=]\n^[ 	]*)([\(\[`])/gmi, '$1;$2')

const endParenthesisRegex = /\)[\n\r 	]+\)/

const formatEndParenthesis = source => !endParenthesisRegex.exec(source) ? source : formatEndParenthesis(source.replace(endParenthesisRegex, '))'))

export default compose(
  removeEolSemi,
  insertImportantSemi,
  removeSemi,
  formatEndParenthesis,
  alwaysAString,
  prettify)