import printValidator from '../src/print'

test('prints an empty validator', () => {
  let result = printValidator('joi', { name: 'any', params: [ ], constraints: [ ] })
  expect(result).toEqual('joi.any()')
})

test('prints using a given joi name', () => {
  let result = printValidator('cheese', { name: 'any', params: [ ], constraints: [ ] })
  expect(result).toEqual('cheese.any()')
})

test('prints a validator with a constraint', () => {
  let result = printValidator('joi', {
    name: 'array',
    params: [ ],
    constraints: [
      { name: 'unique', params: [ ] }
    ]
  })
  expect(result).toEqual('joi.array().unique()')
})

test('prints a constraint with an argument', () => {
  let result = printValidator('joi', { name: 'string', params: [ ], constraints: [
    { name: 'min', params: [ 42 ] }
  ] })
  expect(result).toEqual('joi.string().min(42)')
})