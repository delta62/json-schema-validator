import unsafe, { isNumber } from '../unsafe'

export default function maximumValidator(expected: number, actual: unsafe): boolean {
  if (!isNumber(actual)) return true
  return actual <= expected
}
