import '../matchers/to-have-constraint'

import generateObjectValidator from '../../src/generators/object'

test('generates an object validator', () => {
  let result = generateObjectValidator({ })
  expect(result).toHaveProperty('name', 'object')
})

test('generates a max constraint', () => {
  let result = generateObjectValidator({ maxProperties: 42 })
  expect(result).toHaveConstraint('max', 42)
})

test('generates a min constraint', () => {
  let result = generateObjectValidator({ minProperties: 42 })
  expect(result).toHaveConstraint('min', 42)
})

test('generates a requiredKeys constraint', () => {
  let result = generateObjectValidator({ required: [ 'foo', 'bar' ] })
  expect(result).toHaveConstraint('requiredKeys', 'foo', 'bar')
})

test('generates a keys constraint', () => {
  let result = generateObjectValidator({
    properties: { foo: { type: 'string' }, bar: { type: 'string' } }
  })
  expect(result).toHaveConstraint('keys')
  let subValidators = result.constraints[0].params[0]
  expect(subValidators).toHaveProperty('foo.name', 'string')
  expect(subValidators).toHaveProperty('bar.name', 'string')
})

test('generates a pattern constraint', () => {
  let patternMap = new Map()
  patternMap.set(/^foo$/, { type: 'string' })
  let result = generateObjectValidator({
    patternProperties: patternMap
  })
  expect(result).toHaveConstraint('pattern')
  let subvalidator = result.constraints[0]
  expect(subvalidator.params[0]).toEqual(/^foo$/)
  expect(subvalidator.params[1]).toHaveProperty('name', 'string')
})
