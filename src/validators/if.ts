import { ObjectSchema, Schema } from '../schema'
import unsafe from '../unsafe'
import validateSchema from './schema'

export default function ifValidator(
  expected: Schema,
  actual: unsafe,
  parentSchema: ObjectSchema
): boolean {
  if (validateSchema(expected, actual)) {
    if (parentSchema.hasOwnProperty('then')) {
      return validateSchema(parentSchema.then!, actual)
    }
    return true
  }

  if (parentSchema.hasOwnProperty('else')) {
    return validateSchema(parentSchema.else!, actual)
  }
  return true
}
