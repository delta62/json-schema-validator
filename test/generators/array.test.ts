import '../matchers/to-have-constraint'

import generateArraySchea from '../../src/generators/array'

test('generates an array validator', () => {
    let result = generateArraySchea({ })
    expect(result).toHaveProperty('name', 'array')
})

test('generates a min constraint', () => {
    let result = generateArraySchea({ minItems: 42 })
    expect(result).toHaveConstraint('min', 42)
})

test('generates a max constraint', () => {
    let result = generateArraySchea({ maxItems: 42 })
    expect(result).toHaveConstraint('max', 42)
})

test('generates a unique constreaint', () => {
    let result = generateArraySchea({ uniqueItems: true })
    expect(result).toHaveConstraint('unique')
})
