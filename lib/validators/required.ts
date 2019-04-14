import unsafe, { isObject } from '../unsafe'

export default function requiredValidator(expected: string[], actual: unsafe): boolean {
  if (!isObject(actual)) return true
  return expected.every(k => (actual as Record<string, unsafe>).hasOwnProperty(k))
}
