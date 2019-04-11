import unsafe, { isNumber } from '../unsafe'

export default function minimumValidator(expected: number, actual: unsafe): boolean {
  if (!isNumber(actual)) return true
  return actual >= expected
}
