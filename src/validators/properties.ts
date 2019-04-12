import { Schema } from '../schema'
import schemaValidator from './schema'
import unsafe, { isObject } from '../unsafe'

export default function propertiesValidator(expected: Record<string, Schema>, actual: unsafe): boolean {
  if (!isObject(actual)) return true
  return Object.entries(expected).every(([ k, v ]) => {
    if (!(actual as Record<string, unsafe>).hasOwnProperty(k)) {
      return true
    }
    return schemaValidator(v, actual[k])
  })
}
