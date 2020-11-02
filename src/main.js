const next = require('./next')
const fs = require('fs')
const path = require('path')
const crypto = require('crypto')

// IMPURE
const walker = lastRunTime => dir => {
  const many = []
  const walkSync = d => {
    if (/node_modules/g.test(d)) {
      return
    }
    const files = fs.readdirSync(d)
    files.forEach(file => {
      const p = `${d}/${file}`
      const stat = fs.statSync(p)
      const now = new Date().getTime()

      if (stat.isDirectory()) {
        walkSync(p)
      } else if (stat.mtime.getTime() > lastRunTime || stat.ctime.getTime() > lastRunTime) {
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

const plural = count => (count === 1 ? '' : 's')

const setLastRunTime = path => {
  try {
    write(path)(Date.now())
  } catch (_) {}
}

const getLastRunTime = path => (fs.existsSync(path) ? read(path) : 0)

// PROGRAM
const selectPathArg = () => (process.argv[2] || '').concat('/')

const selectPath = () => path.normalize(path.join(process.cwd(), selectPathArg()))

const startDate = Date.now()

const lastRunPath = path.resolve(
  __dirname,
  '../.last_' +
    crypto
      .createHash('md5')
      .update(selectPath())
      .digest('hex'))

const count = walker(getLastRunTime(lastRunPath))(selectPath())
  .filter(f => f.toLowerCase().endsWith('.js'))
  .map(format).length

setLastRunTime(lastRunPath)

const seconds = (Date.now() - startDate) / 1000

console.log(`Formatted ${count} file${plural(count)} in ${seconds}s.`)
