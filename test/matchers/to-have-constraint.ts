export { }

declare global {
    namespace jest {
        interface Matchers<R> {
            toHaveConstraint(name: string, ...params: any[]): CustomMatcherResult
        }
    }
}

expect.extend({ toHaveConstraint })

function toHaveConstraint(this: jest.MatcherUtils, actual: any, name: string, ...params: any[]) {
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

    let actualParams: any[] = constraintDef.params || [ ]
    let sameParams = actualParams.every((param, i) => {
      if (param === params[i]) return true
      if (param instanceof RegExp) {
        return param.toString() === params[i].toString()
      }
      return false
    })
    if (actualParams.length !== params.length || !sameParams) {
        return {
            pass: false,
            message: () => `Expected "${name}" constraint to have params \
${this.utils.printExpected(params)}, but got ${this.utils.printReceived(actualParams)}`
        }
    }

    return { pass: true, message: () => `Validator has constraint ${name}` }
}
