import maxLengthValidator from '../../lib/validators/max-length'

function unsafe(x: any) { return x as never }

test('validates max length of a string', () => {
  expect(maxLengthValidator(3, unsafe('a'))).toBe(true)
})

test('validates max length of an empty string', () => {
  expect(maxLengthValidator(3, unsafe(''))).toBe(true)
})

test('validates string with length equal to max', () => {
  expect(maxLengthValidator(3, unsafe('foo'))).toBe(true)
})

test('fails to validate a long string', () => {
  expect(maxLengthValidator(3, unsafe('cheese'))).toBe(false)
});

[
  true,
  false,
  null,
  42,
  12.34,
  { },
  [ ]
].forEach(x => {
  test(`validates non-number input ${x}`, () => {
    expect(maxLengthValidator(0, unsafe(x))).toBe(true)
  })
})
