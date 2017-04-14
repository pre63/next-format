const assert = require('assert')
const fs = require('fs')
const next = require('../src/next')
const compose = require('oncha/compose').default

// PURE
const split = c => s => s.split(c)

const trim = s => s.trim()

const createTestObject = arr => ({
  message: arr[0],
  original: trim(arr[1]),
  expected: trim(arr[2]) + '\n'
})

const createTestData = compose(
  createTestObject,
  split('-----------------------------------'))

const tryCatch = func => {
  try {
    return func()
  } catch (e) {
    return {
      message: !e.expected ? e : e.message,
      actual: e.actual,
      expect: e.expected
    }
  }
}

const orPass = s => (s ? s : 'Test Pass')

const createTest = test => () =>
  tryCatch(() => assert.equal(next(test.original), test.expected, test.message))

// IMPURE
const make = file => `${__dirname}/cases/${file}.txt`

const read = file => fs.readFileSync(file, 'UTF-8')

const log = message => console.log(message)

const executor = testFunc => compose(log, orPass, testFunc)

const test = compose(executor, createTest, createTestData, read, make)

module.exports = test
