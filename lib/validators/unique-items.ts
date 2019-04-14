import unsafe, { isArray } from '../unsafe'
import constValidator from './const'

export default function uniqueItemsValidator(expected: boolean, actual: unsafe): boolean {
  if (!isArray(actual) || !expected) return true
  return (actual as unsafe[]).some((a, idx1) => {
    return (actual as unsafe[]).some((b, idx2) => idx1 !== idx2 && constValidator(a, b))
  })
}
