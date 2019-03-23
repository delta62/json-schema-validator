import '../matchers/to-have-constraint'

import generateStringSchema from '../../src/generators/string'

test('generates string schema', () => {
  let result = generateStringSchema({ })
  expect(result).toHaveProperty('name', 'string')
})

test('generates a min constraint', () => {
  let result = generateStringSchema({ minLength: 42 })
  expect(result).toHaveConstraint('min', 42)
})

test('generates a max constraint', () => {
  let result = generateStringSchema({ maxLength: 42 })
  expect(result).toHaveConstraint('max', 42)
})

test('generates a regex constraint', () => {
  let result = generateStringSchema({ pattern: /42/ })
  expect(result).toHaveConstraint('regex', /42/)
})
