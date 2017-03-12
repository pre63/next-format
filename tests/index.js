const assert = require('assert')
const fs = require('fs')
const next = require('../')

// PURE
const compose = (...args) => a => args.reduceRight((acc, func) => func(acc), a)

const split = c => s => s.split(c)

const trim = s => s.trim()

const createTestObject = arr => ({
  message: arr[0],
  original: trim(arr[1]),
  expected: trim(arr[2]) + '\n',
})

const createTestData = compose(createTestObject, split('-----------------------------------'))

const tryCatch = func => {
  try {
    return func()
  } catch (e) {
    return e
  }
}

const orPass = (s = 'Test Pass') => s

const createTest = test =>
  () => tryCatch(() => assert.equal(next(test.original), test.expected, test.message))

// IMPURE
const make = file => `${__dirname}/${file}.txt`

const read = file => fs.readFileSync(file, 'UTF-8')

const log = message => console.log(message)

const executor = testFunc => compose(log, orPass, testFunc)

const test = compose(executor, createTest, createTestData, read, make)

// Acctual tests
test('assignation')()
test('parens-1')()
test('parens-2')()
test('parens-3')()
test('semi-arrow')()
