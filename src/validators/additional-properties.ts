import unsafe, { isObject } from '../unsafe'
import { ObjectSchema, Schema } from '../schema'
import schemaValidator from './schema'

export default function additionalPropertiesValidator(
  expected: Schema,
  actual: unsafe,
  parentSchema: ObjectSchema
): boolean {
  if (!isObject(actual)) return true

  return Object.entries(actual as Record<string, unsafe>).every(([ k, v ]) => {
    let isSpecifiedProperty = parentSchema.properties && !!parentSchema.properties[k]
    let isRegexProperty = parentSchema.patternProperties
      && Object.keys(parentSchema.patternProperties).find(x => {
        return new RegExp(x).test(k)
    }) !== undefined

    return isSpecifiedProperty || isRegexProperty || schemaValidator(expected, v)
  })
}
