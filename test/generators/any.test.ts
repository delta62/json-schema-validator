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

test('generates a when constraint', () => {
  let result = generateAnySchema({ if: true })
  expect(result).toHaveConstraint('when')
})

test('generates a condition arg', () => {
  let result = generateAnySchema({ if: true })
  let params = result.constraints[0].params
  let [ condition ] = params
  expect(condition).toHaveProperty('name', 'any')
})

test('generates an then arg', () => {
  let result = generateAnySchema({ if: false, then: true })
  let params = result.constraints[0].params
  let [ , opts ] = params
  let { then } = opts
  expect(then).toHaveProperty('name', 'any')
})

test('generates an otherwise arg', () => {
  let result = generateAnySchema({ if: false, then: true, else: true })
  let params = result.constraints[0].params
  let [ , opts ] = params
  let { otherwise } = opts
  expect(otherwise).toHaveProperty('name', 'any')
})
