import patternValidator from '../../lib/validators/pattern'

function unsafe(x: any) { return x as never }

test('validates a non-anchored matching string', () => {
  expect(patternValidator(/oo/, unsafe('foobar'))).toBe(true)
})

test('validates an anchored string', () => {
  expect(patternValidator(/bar$/, unsafe('foobar'))).toBe(true)
})

test('fails to validate a non-matching string', () => {
  expect(patternValidator(/foo/, unsafe('bar'))).toBe(false)
})

test('fails to validate an anchored string', () => {
  expect(patternValidator(/^bar/, unsafe('foobar'))).toBe(false)
});

[
  true,
  false,
  42,
  12.34,
  [ ],
  { }
].forEach(x => {
  test(`validates non-string value ${x}`, () => {
    expect(patternValidator(/^/, unsafe(x))).toBe(true)
  })
})
