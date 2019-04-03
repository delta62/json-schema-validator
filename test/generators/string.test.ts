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

describe('format', () => {
  test('generates isoDate constraint for "date" format', () => {
    let result = generateStringSchema({ format: 'date' })
    expect(result).toHaveConstraint('isoDate')
  })

  test('generates isoDate constraint for "date-time" format', () => {
    let result = generateStringSchema({ format: 'date-time' })
    expect(result).toHaveConstraint('isoDate')
  })

  test('generates email constraint', () => {
    let result = generateStringSchema({ format: 'email' })
    expect(result).toHaveConstraint('email')
    expect(result.constraints[0].params[0].allowUnicode).toEqual(false)
  })

  test('generates idn email constraint', () => {
    let result = generateStringSchema({ format: 'idn-email' })
    expect(result).toHaveConstraint('email')
    expect(result.constraints[0].params[0].allowUnicode).toEqual(true)
  })

  test('generates ipv4 constraint', () => {
    let result = generateStringSchema({ format: 'ipv4' })
    expect(result).toHaveConstraint('ip')
    expect(result.constraints[0].params[0].version).toContain('ipv4')
  })

  test('generates ipv6 constraint', () => {
    let result = generateStringSchema({ format: 'ipv6' })
    expect(result).toHaveConstraint('ip')
    expect(result.constraints[0].params[0].version).toContain('ipv6')
  })

  test('generates uri constraint', () => {
    let result = generateStringSchema({ format: 'uri' })
    expect(result).toHaveConstraint('uri')
  })

  test('generates hostname constraint', () => {
    let result = generateStringSchema({ format: 'hostname' })
    expect(result).toHaveConstraint('hostname')
  })

  test('throws on unsupported format', () => {
    expect(() => generateStringSchema({ format: 'cheese' })).toThrow()
  })
})
