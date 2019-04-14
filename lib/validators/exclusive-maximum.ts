import unsafe, { isNumber } from '../unsafe'

export default function exclusiveMaximumValidator(expected: number, actual: unsafe): boolean {
  if (!isNumber(actual)) return true
  return expected > actual
}
