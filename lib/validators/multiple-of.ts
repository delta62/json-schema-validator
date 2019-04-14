import unsafe, { isNumber } from '../unsafe'

export default function validateMultipleOf(expected: number, actual: unsafe): boolean {
  if (!isNumber(actual)) return true
  return actual % expected === 0
}
