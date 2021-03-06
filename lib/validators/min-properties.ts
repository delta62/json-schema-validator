import unsafe, { isObject } from '../unsafe'

export default function minPropertiesValidator(expected: number, actual: unsafe): boolean {
  if (!isObject(actual)) return true
  return Object.keys(actual).length >= expected
}
