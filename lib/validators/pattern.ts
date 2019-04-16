import unsafe, { isString } from '../unsafe'

export default function patternValidator(expected: RegExp, actual: unsafe): boolean {
  if (!isString(actual)) return true
  return expected.test(actual)
}
