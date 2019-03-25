export { }

declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveConstraint(name: string, ...params: any[]): CustomMatcherResult
    }
  }
}

expect.extend({ toHaveConstraint })

function toHaveConstraint(this: jest.MatcherUtils, actual: any, name: string, params: any | any[] = [ ]) {
  if (!actual) {
    return {
      pass: false,
      message: () => `${this.utils.printReceived(actual)} is not a validator`
    }
  }

  let actualConstraints: any[] = actual.constraints || [ ]
  let constraintDef = actualConstraints.find(c => c.name === name)
  if (!constraintDef) {
    return {
      pass: false,
      message: () => `Expected validator to have constraint ${this.utils.printExpected(name)}`
    }
  }

  params = Array.isArray(params) ? params : [ params ]
  let actualParams: any[] = constraintDef.params || [ ]
  let sameParams = (params as any[]).every((param, i) => {
    if (param === actualParams[i]) return true
    if (param instanceof RegExp) {
      return param.toString() === params[i].toString()
    }
    return false
  })
  if (!sameParams) {
    return {
      pass: false,
      message: () => `Expected "${name}" constraint to have params \
      ${this.utils.printExpected(params)}, but got ${this.utils.printReceived(actualParams)}`
    }
  }

  return { pass: true, message: () => `Validator has constraint ${name}` }
}
