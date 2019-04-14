import multipleOfValidator from '../../lib/validators/multiple-of'

test('passes for non-numeric inputs', () => {
  expect(validate(2, 'foo')).toBe(true)
  expect(validate(2, null)).toBe(true)
  expect(validate(2, true)).toBe(true)
  expect(validate(2, [ ])).toBe(true)
  expect(validate(2, { })).toBe(true)
})

test('passes for integer multiples', () => {
  expect(validate(2, 4)).toBe(true)
})

test('passes for floating point multiples', () => {
  expect(validate(1.5, 3)).toBe(true)
})

test('fails for integer non-multiples', () => {
  expect(validate(2, 3)).toBe(false)
})

test('fails for flaoting point non-multiples', () => {
  expect(validate(1.5, 2)).toBe(false)
})

function validate(multiple: number, test: any): boolean {
  return multipleOfValidator(multiple, test as never)
}
