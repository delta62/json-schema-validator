import minLengthValidator from '../../lib/validators/min-length'

function unsafe(x: any) { return x as never }

test('validates min length of a string', () => {
  expect(minLengthValidator(1, unsafe('foo'))).toBe(true)
})

test('validates min length of an empty string', () => {
  expect(minLengthValidator(0, unsafe(''))).toBe(true)
})

test('validates string with length equal to min', () => {
  expect(minLengthValidator(3, unsafe('foo'))).toBe(true)
})

test('fails to validate a long string', () => {
  expect(minLengthValidator(3, unsafe('x'))).toBe(false)
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
    expect(minLengthValidator(0, unsafe(x))).toBe(true)
  })
})
