import './matchers/to-have-constraint'

import generateNumberSchema from '../src/generators/number'

test('generates a number validator', () => {
    let result = generateNumberSchema({ })
    expect(result).toHaveProperty('name', 'number')
})

test('generates a min constraint', () => {
    let result = generateNumberSchema({ minimum: 42 })
    expect(result).toHaveConstraint('min', 42)
})

test('generates a max constraint', () => {
    let result = generateNumberSchema({ maximum: 42 })
    expect(result).toHaveConstraint('max', 42)
})

test('generates a multiple constraint', () => {
    let result = generateNumberSchema({ multipleOf: 42 })
    expect(result).toHaveConstraint('multiple', 42)
})

test('generates a less constraint', () => {
    let result = generateNumberSchema({ exclusiveMaximum: 42 })
    expect(result).toHaveConstraint('less', 42)
})

test('generates a greater constraint', () => {
    let result = generateNumberSchema({ exclusiveMinimum: 42 })
    expect(result).toHaveConstraint('greater', 42)
})
