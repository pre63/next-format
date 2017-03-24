const prettier = require('prettier')

const prettify = source =>
  prettier.format(source, {
    printWidth: 80,
    tabWidth: 2,
    singleQuote: true,
    trailingComma: 'es5',
    bracketSpacing: false,
    jsxBracketSameLine: true,
    parser: 'babylon',
  })

const undefinedToString = (s = '') => s

const compose = (...args) => a => args.reduceRight((acc, func) => func(acc), a)

const replace = ([exp, repl]) => s => s.replace(exp, repl)

const removeSemi = replace([/[ 	;]+([\n\r])/gmi, '$1'])

const moveImportantSemi = replace([/(;)([\n\r 	]*)([\[`\(])/gmi, '$2$1$3'])

const insertCurlySpaces = replace([
  /(={)([^ }]*)(})|(^[^`'/\n]*[^$\\u=]{1,2}{)([^}\n]*)(}[^`\n]*\n)/gmi,
  '$1$4 $2$5 $3$6',
])

const leftRegex = /([({[])[\n\r 	]+([{(])/gmi
const replaceLeft = replace([leftRegex, '$1$2'])

const formatLeft = source =>
  !leftRegex.exec(source) ? source : formatLeft(replaceLeft(source))

const rightRegex = /([\)\}])[\n\r 	]+([)\]])|[\n\r 	]+(\)(\n))/gmi
const replaceRight = replace([rightRegex, '$1$2$3$4'])

const formatRight = source =>
  !rightRegex.exec(source) ? source : formatRight(replaceRight(source))

module.exports = compose(
  insertCurlySpaces,
  formatLeft,
  formatRight,
  removeSemi,
  moveImportantSemi,
  undefinedToString,
  prettify)

