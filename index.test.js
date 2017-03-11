import assert from 'assert'
import next from './'

describe('A next-format', () => {
  it('Sould format and object assignation', () =>
    assert(next(`
const a = x =>  ({
a:1,
b,
x
}
)
`),
      `const a = x => ({
  a: 1,
  b,
  x,
})
`))

  it('Sould format end parens', () =>
    assert(next(`const a = b => c(
        d, e=> f(
          g
        )
)
`),
      `const a = b => c(d, e => f(g))`))


  it('Sould format end parens 2', () =>
    assert.equal(next(`(d) =>    a.a(b)
      .a(
        (
          b
          ) =>

         c.d(e).f() ? g(current)

          : h.e(current)
          );`),
      `d => a.a(b).a(b => c.d(e).f() ? g(current) : h.e(current))\n`))

  it('Sould format end parens 3', () =>
    assert.equal(next(
      `(d) =>    a.aaaaaaaaaaaaaaaaaa(b)
      .aaaaaaaaaaaaaaaaaaa(
        (
          b
          ) =>

         c.daaaaaaaaaaaaaaaaaa(e).f() ? g(current)

          : h.eaaaaaaaaaaaaaaaaaa(current)
          );`),
      `d =>\n  a\n    .aaaaaaaaaaaaaaaaaa(b)\n    .aaaaaaaaaaaaaaaaaaa(\n      b => c.daaaaaaaaaaaaaaaaaa(e).f() ? g(current) : h.eaaaaaaaaaaaaaaaaaa(current))\n`))
})