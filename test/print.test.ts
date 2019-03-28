import printValidator from '../src/print'

test('prints an empty validator', () => {
  let result = printValidator('joi', { name: 'any', params: [], constraints: [] })
  expect(result).toEqual('joi.any()')
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
