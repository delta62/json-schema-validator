import unsafe, { isArray } from '../unsafe'

export default function minItemsValidator(expected: number, actual: unsafe): boolean {
  if (!isArray(actual)) return true
  return (actual as unsafe[]).length >= expected
}
