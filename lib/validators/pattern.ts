import unsafe, { isString } from '../unsafe'

export default function patternValidator(expected: string, actual: unsafe): boolean {
  if (!isString(actual)) return true
  return new RegExp(expected).test(actual)
}
