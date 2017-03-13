#!/usr/bin/env node

const next = require('../')
const fs = require('fs')
const path = require('path')

const walker = dir => {
  const many = []
  const walkSync = d => {
    if (/node_modules/g.test(d)) {
      return
    }
    const files = fs.readdirSync(d)
    files.forEach(file => {
      const p = `${d}/${file}`
      if (fs.statSync(p).isDirectory()) {
        walkSync(p)
      } else {
        many.push(path.relative(dir, p))
      }
    })
  }
  walkSync(dir)
  return many
}

const read = file => fs.readFileSync(file, 'UTF-8')
const write = file =>
  content => fs.writeFileSync(file, content, 'UTF-8', { flags: 'w+' })

const format = file => write(file)(next(read(file)))

walker(process.cwd()).filter(f => f.toLowerCase().endsWith('.js')).map(format)
