import unsafe, { isArray, isObject } from '../unsafe'
import { Schema } from '../schema'
import validateSchema from './schema'

export default function dependenciesValidator(
  expected: Record<string, string[] | Schema>,
  actual: unsafe
): boolean {
  if (!isObject(actual)) return true

  return Object.entries(expected).every(([ k, dep ]) => {
    if (!(actual as Record<string, unsafe>).hasOwnProperty(k)) return true

    if (isArray(dep)) {
      return dep.every(depKey => (actual as Record<string, unsafe>).hasOwnProperty(depKey))
    }

    return validateSchema(dep as Schema, actual)
  })
}
