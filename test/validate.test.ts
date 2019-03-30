import validate from '../src/validate'

test('allows true schema', () => {
  let result = validate(true)
  expect(result).toHaveProperty('pass', true)
})

test('allows false schema', () => {
  let result = validate(false)
  expect(result).toHaveProperty('pass', true)
})

test('allows empty object schema', () => {
  let result = validate({ })
  expect(result).toHaveProperty('pass', true)
})

test('reports unknown keys', () => {
  let result = validate({ foo: 'bar' })
  expect(result.unknownKeys).toContain('foo')
})

test('reports invalid keys', () => {
  let result = validate({ maxItems: 'forty two' })
  expect(result.invalidKeys).toContain('maxItems')
})

test('fails with invalid keys', () => {
  let result = validate({ maxItems: 'forty two' })
  expect(result).toHaveProperty('pass', false)
})
