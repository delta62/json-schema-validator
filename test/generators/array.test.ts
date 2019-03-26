import '../matchers/to-have-constraint'

import generateArraySchema from '../../src/generators/array'

test('generates an array validator', () => {
    let result = generateArraySchema({ })
    expect(result).toHaveProperty('name', 'array')
})

test('generates a min constraint', () => {
    let result = generateArraySchema({ minItems: 42 })
    expect(result).toHaveConstraint('min', 42)
})

test('generates a max constraint', () => {
    let result = generateArraySchema({ maxItems: 42 })
    expect(result).toHaveConstraint('max', 42)
})

test('generates a unique constraint', () => {
    let result = generateArraySchema({ uniqueItems: true })
    expect(result).toHaveConstraint('unique')
})

test('generates a contains constraint', () => {
  let result = generateArraySchema({
    contains: { type: 'string', minLength: 42 }
  })
  expect(result).toHaveConstraint('contains')
  let subSchema = result.constraints[0].params[0]
  expect(subSchema).toHaveConstraint('min', 42)
})

test('generates an items constraint', () => {
  let result = generateArraySchema({
    items: { type: 'string', minLength: 42 }
  })
  expect(result).toHaveConstraint('items')
  let subSchema = result.constraints[0].params[0]
  expect(subSchema).toHaveConstraint('min', 42)
})
