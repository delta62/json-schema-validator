import maxItemsValidator from '../../lib/validators/max-items'

function unsafe(x: any) { return x as never }

[
  [ 0, [ ] ],
  [ 3, [ 1, 2 ] ],
  [ 3, [ 1, 2, 3 ] ],
  [ 0, true ],
  [ 0, false ],
  [ 0, null ],
  [ 0, 'foo' ],
  [ 0, { } ],
  [ 0, 42 ],
  [ 0, 12.34 ]
].forEach(([ max, items ]: any) => {
  test(`validates length of ${items} <= ${max}`, () => {
    expect(maxItemsValidator(max, unsafe(items))).toBe(true)
  })
});

[
  [ 1, [ 1, 2 ] ],
  [ 0, [ 1 ] ]
].forEach(([ max, items ]: any) => {
  test(`fails validation of ${items} <= ${max}`, () => {
    expect(maxItemsValidator(max, unsafe(items))).toBe(false)
  })
})
