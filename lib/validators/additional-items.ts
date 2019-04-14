import { ObjectSchema, Schema } from '../schema'
import schemaValidator from './schema'
import unsafe, { isArray } from '../unsafe'

export default function additionalItemsValidator(
  expected: Schema,
  actual: unsafe,
  parentSchema: ObjectSchema
): boolean {
  if (!isArray(actual) || !isArray(parentSchema.items)) return true

  return parentSchema.items.slice(parentSchema.items.length).every(item => {
    return schemaValidator(expected, item)
  })
}
