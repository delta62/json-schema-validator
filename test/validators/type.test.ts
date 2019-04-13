import { SchemaType } from '../../src/schema'
import validateType from '../../src/validators/type'

describe('string types', () => {
  successCases('string', [
    'foo',
    '',
    '42',
    'null',
    '\x00'
  ])

  failureCases('string', [
    42,
    42.1234,
    { },
    [ ],
    null,
    true,
    false
  ])
})

describe('number types', () => {
  successCases('number', [
    0,
    42,
    12.345,
    -10
    -11.22
  ])

  failureCases('number', [
    'foo',
    true,
    false,
    '42',
    Infinity,
    { },
    [ ],
    null
  ])
})

describe('integer types', () => {
  successCases('integer', [
    0,
    42,
    -10
  ])

  failureCases('integer', [
    12.2,
    -0.1,
    'foo',
    { },
    [ ],
    null,
    true,
    false,
    Infinity
  ])
})

describe('boolean cases', () => {
  successCases('boolean', [
    true,
    false
  ])

  failureCases('boolean', [
    0,
    null,
    'foo',
    { },
    42,
    12.34,
    -10,
    [ ]
  ])
})

describe('array cases', () => {
  successCases('array', [
    [ ],
    [ 1, 2, 3 ],
    [ 'foo' ],
    [ { } ]
  ])

  failureCases('array', [
    null,
    true,
    false,
    0,
    42,
    -10,
    12.34,
    'foo',
    { }
  ])
})

describe('object cases', () => {
  successCases('object', [
    { },
    { foo: 'bar' }
  ])

  failureCases('object', [
    0,
    true,
    false,
    null,
    [ ],
    'foo',
    42,
    0,
    -10,
    12.34
  ])
})

describe('null cases', () => {
  successCases('null', [
    null
  ])

  failureCases('null', [
    true,
    false,
    'foo',
    [ ],
    { },
    0,
    42,
    -10,
    12.34
  ])
})

function successCases(type: SchemaType, cases: any[]) {
  generateCases(type, cases, true)
}

function failureCases(type: SchemaType, cases: any[]) {
  generateCases(type, cases, false)
}

function generateCases(type: SchemaType, cases: any[], expectedResult: boolean) {
  cases.forEach(input => {
    let message = expectedResult ? `validates ${input}` : `fails to validate ${input}`
    test(message, () => {
      expect(validateType(type, input as never)).toBe(expectedResult)
    })
  })
}
