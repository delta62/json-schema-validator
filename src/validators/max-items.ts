import unsafe, { isArray } from '../unsafe'

export default function maxItemsValidator(expected: number, actual: unsafe): boolean {
  if (!isArray(actual)) return true
  return (actual as unsafe[]).length <= expected
}
