import minItemsValidator from '../../lib/validators/min-items'

function unsafe(x: any) { return x as never }

[
  [ 0, [ ] ],
  [ 1, [ 1, 2 ] ],
  [ 3, [ 1, 2, 3 ] ],
  [ 0, true ],
  [ 0, false ],
  [ 0, null ],
  [ 0, 'foo' ],
  [ 0, { } ],
  [ 0, 42 ],
  [ 0, 12.34 ]
].forEach(([ min, items ]: any) => {
  test(`validates length of ${items} <= ${min}`, () => {
    expect(minItemsValidator(min, unsafe(items))).toBe(true)
  })
});

[
  [ 1, [ ] ],
  [ 3, [ 1, 2 ] ]
].forEach(([ min, items ]: any) => {
  test(`fails validation of ${items} <= ${min}`, () => {
    expect(minItemsValidator(min, unsafe(items))).toBe(false)
  })
})
