import exclusiveMinimumValidator from '../../lib/validators/exclusive-minimum'

([
  [ 10, 11 ],
  [ 10.01, 10.02 ],
  [ 0, null ],
  [ 0, false ],
  [ 0, 'foo' ],
  [ 0, [ ] ],
  [ 0, { } ]
] as [ number, any][]).forEach(([ min, actual ]) => successCase(min, actual));

[
  [ 42, 42 ],
  [ 42, 10 ],
  [ 12.34, 12.34 ],
  [ 13.01, 12.34 ]
].forEach(([ min, actual ]) => failureCase(min, actual))

function successCase(min: number, actual: any) {
  test(`validates ${actual}`, () => {
    expect(exclusiveMinimumValidator(min, actual as never)).toBe(true)
  })
}

function failureCase(min: number, actual: any) {
  test(`fails to validate ${actual} > ${min}`, () => {
    expect(exclusiveMinimumValidator(min, actual as never)).toBe(false)
  })
}
