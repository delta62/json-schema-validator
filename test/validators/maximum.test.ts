import maximumValidator from '../../lib/validators/maximum'

([
  [ 42, 10 ],
  [ 42, 42 ],
  [ 13.01, 12.34 ],
  [ 12.34, 12.34 ],
  [ 0, null ],
  [ 0, false ],
  [ 0, 'foo' ],
  [ 0, [ ] ],
  [ 0, { } ]
] as [ number, any][]).forEach(([ max, actual ]) => successCase(max, actual));

[
  [ 10, 11 ],
  [ 10.01, 10.02 ]
].forEach(([ max, actual ]) => failureCase(max, actual))

function successCase(max: number, actual: any) {
  test(`validates ${actual}`, () => {
    expect(maximumValidator(max, actual as never)).toBe(true)
  })
}

function failureCase(max: number, actual: any) {
  test(`fails to validate ${actual} <= ${max}`, () => {
    expect(maximumValidator(max, actual as never)).toBe(false)
  })
}
