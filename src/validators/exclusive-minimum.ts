import unsafe, { isNumber } from '../unsafe'

export default function exclusiveMinimumValidator(expected: number, actual: unsafe): boolean {
  if (!isNumber(actual)) return true
  return expected < actual
}
