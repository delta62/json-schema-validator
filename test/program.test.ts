import './matchers/to-have-constraint'

import generateStringSchema from '../src/generators/string'

test.todo('generates true schema')

test.todo('generates false schema')

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

// test('generates min length string', () => {
//     expect({
//         type: 'string',
//         minLength: 42
//     })
//     .toGenerateSchema('joi.string().min(42)')
// })
//
// test('generates max length string', () => {
//     expect({
//         type: 'string',
//         maxLength: 42
//     })
//     .toGenerateSchema('joi.string().max(42)')
// })
//
// test('generates regex string', () => {
//     expect({
//         type: 'string',
//         pattern: /^foo|bar$/
//     })
//     .toGenerateSchema('joi.string().regex(/^foo|bar$/)')
// })
