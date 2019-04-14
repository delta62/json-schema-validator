import constValidator from '../../src/validators/const'

[
  [ 'foo', 'foo' ],
  [ 42, 42 ],
  [ 12.34, 12.34 ],
  [ true, true ],
  [ null, null ],
  [ [ ], [ ] ],
  [ { }, { } ],
  [ [ [ 1, 2, 3 ] ], [ [ 1, 2, 3 ] ] ],
  [ { foo: { bar: 'baz' } }, { foo: { bar: 'baz' } } ]
].forEach(([ expected, actual ]) => expectValid(expected, actual));

[
  [ 'foo', 'bar' ],
  [ 'foo', 42 ],
  [ 42, 43 ],
  [ 12.34, 9.87 ],
  [ null, false ],
  [ true, false ],
  [ [ ], [ 1 ] ],
  [ [ 1 ], [ ] ],
  [ { }, { foo: 1 } ],
  [ { foo: 1 }, { } ]
].forEach(([ expected, actual ]) => expectInvalid(expected, actual))

function expectValid(expected: any, actual: any) {
  test(`validates ${actual}`, () => {
    expect(constValidator(expected, actual as never)).toBe(true)
  })
}

function expectInvalid(expected: any, actual: any) {
  test(`fails to validate ${expected} with ${actual}`, () => {
    expect(constValidator(expected, actual as never)).toBe(false)
  })
}
