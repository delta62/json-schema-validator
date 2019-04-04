import '../matchers/to-have-constraint'

import generateAnySchema from '../../src/generators/any'

test('generates an any validator', () => {
  let result = generateAnySchema({ })
  expect(result).toHaveProperty('name', 'any')
})

test('generates an emum constraint', () => {
  let result = generateAnySchema({
    enum: [ 'a', null, 42 ]
  })
  expect(result).toHaveConstraint('valid', [ 'a', null, 42 ])
})

test('generates a const constraint', () => {
  let result = generateAnySchema({ const: 42 })
  expect(result).toHaveConstraint('valid', 42)
})

test.todo('generates a when constraint')
test.todo('generates an else constraint')
test.todo('generates an otherwise constraint')
