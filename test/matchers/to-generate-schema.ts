import diff from 'jest-diff'

declare global {
    namespace jest {
        interface Matchers<R> {
            toGenerateSchema(expected: string): CustomMatcherResult
        }
    }
}

expect.extend({ toGenerateSchema })

import generateSchema from '../../src/generate'

function toGenerateSchema(this: jest.MatcherUtils, actual: any, expected: string) {
    let result = generateSchema(actual)
    let pass = this.equals(result, expected)
    let message: string
    if (pass) {
        message = [
            this.utils.matcherHint('toGenerateSchema'),
            `Expected: ${this.utils.printExpected(expected)}`,
            `Received: ${this.utils.printReceived(actual)}`
        ].join('\n')
    } else {
        let difference = diff(expected, result, { expand: this.expand })
        message = [
            this.utils.matcherHint('toGenerateSchema'),
            difference
        ].join('\n')
    }
    return { pass, message: () => message }
}
