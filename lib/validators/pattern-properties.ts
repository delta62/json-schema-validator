import unsafe, { isObject } from '../unsafe'
import { Schema } from '../schema'
import schemaValidator from './schema'

export default function patternPropertiesValidator(
  expected: Record<string, Schema>,
  actual: unsafe
): boolean {
  if (!isObject(actual)) return true

  return Object.entries(expected).every(([ reText, schema ]) => {
    let re = new RegExp(reText)
    return Object.entries(actual as Record<string, unsafe>).every(([ k, v ]) => {
      if (!re.test(k)) return true
      return schemaValidator(schema, v)
    })
  })
}
