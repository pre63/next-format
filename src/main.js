const compose = require('oncha/compose').default
const next = require('./next')
const fs = require('fs')
const path = require('path')

// IMPURE
const walker = dir => {
  const many = []
  const walkSync = d => {
    if (/node_modules/g.test(d)) {
      return
    }
    const files = fs.readdirSync(d)
    files.forEach(file => {
      const p = `${d}/${file}`
      const stat = fs.statSync(p)

      if (stat.isDirectory()) {
        walkSync(p)
      } else if (now - stat.mtime.getTime() < 1000 * 60 * 5 || now - stat.ctime.getTime() < 1000 * 60 * 5) { // TODO: Replace hard-coded time with the last next-format run
        many.push(path.relative(process.cwd(), p))
      }
    })
  }
  walkSync(dir)
  return many
}

const read = file => fs.readFileSync(file, 'UTF-8')

const write = file => content => fs.writeFileSync(file, content, 'UTF-8', { flags: 'w+' })

const format = file => {
  const init = read(file)
  const res = next(init)

  init != res && write(file)(res)
}

const plurial = count => (count > 1 ? 's' : '')

// PROGRAM
const selectPathArg = () => (process.argv[2] || '').concat('/')

const selectPath = () => path.normalize(path.join(process.cwd(), selectPathArg()))

const startDate = Date.now()

const count = walker(selectPath()).filter(f => f.toLowerCase().endsWith('.js')).map(format).length

const seconds = (Date.now() - startDate) / 1000

console.log(`Formatted ${count} file${plurial(count)} in ${seconds}s.`)
