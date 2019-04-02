import validate from '../src/validate'

test('allows true schema', () => {
  let result = validate(true, true)
  expect(result).toHaveProperty('pass', true)
})

test('allows false schema', () => {
  let result = validate(false, true)
  expect(result).toHaveProperty('pass', true)
})

test('allows empty object schema', () => {
  let result = validate({ }, true)
  expect(result).toHaveProperty('pass', true)
})

test('reports unknown keys', () => {
  let result = validate({ foo: 'bar' }, true)
  expect(result).toHaveProperty('unknownKeys.foo', '"bar"')
})

test('reports invalid keys', () => {
  let result = validate({ maxItems: 'forty two' }, true)
  expect(result).toHaveProperty('invalidKeys.maxItems.expected', 'number')
  expect(result).toHaveProperty('invalidKeys.maxItems.actual', '"forty two"')
})

test('fails with invalid keys', () => {
  let result = validate({ maxItems: 'forty two' }, true)
  expect(result).toHaveProperty('pass', false)
})
