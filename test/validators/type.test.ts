import { SchemaType } from '../../lib/schema'
import validateType from '../../lib/validators/type'

const CASES: Record<string, any[]> = {
  null:    [ null ],
  boolean: [ true, false ],
  integer: [ 0, -0, -10, 10 ],
  number:  [ -12.34, 12.34 ],
  string:  [ '', 'foo', '42', '\x00' ],
  object:  [ { }, { foo: [ ] }, { foo: 'bar' } ],
  array:   [ [ ], [ 1, 2, 3 ] ],
  never:   [ Infinity, undefined ]
}

let allTypes: SchemaType[] = [ 'string', 'null', 'array', 'object', 'boolean', 'number', 'integer' ]

allTypes.forEach(type => {
  describe(`${type} tests`, () => {
    successCases(type, CASES[type])
    failureCases(type, Object.entries(CASES)
      .filter(([ k ]) => k !== type)
      .reduce((acc, [ k, cases ]) => {
        if ([ 'integer', 'number' ].includes(k) && [ 'integer', 'number'].includes(type)) {
          return acc
        }
        return acc.concat(cases)
      }, [ ] as any[])
    )
  })
})

function successCases(type: SchemaType, cases: any[]) {
  generateCases(type, cases, true)
}

function failureCases(type: SchemaType, cases: any[]) {
  generateCases(type, cases, false)
}

function generateCases(type: SchemaType, cases: any[], expectedResult: boolean) {
  cases.forEach(input => {
    let message = expectedResult
      ? `validates ${input}`
      : `fails to validate ${input}`
    test(message, () => {
      expect(validateType(type, input as never)).toBe(expectedResult)
    })
  })
}
