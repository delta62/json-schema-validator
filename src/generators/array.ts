import generateValidator from './index'
import { Validator, addConstraint, validator, constraint } from './validator'
import { ObjectSchema, Schema } from '../schema'

export default function generateNumberSchema(schema: ObjectSchema): Validator {
  let v = validator('array')
  if (schema.hasOwnProperty('maxItems')) {
    v = addConstraint(v, constraint('max', schema.maxItems))
  }
  if (schema.hasOwnProperty('minItems')) {
    v = addConstraint(v, constraint('min', schema.minItems))
  }
  if (schema.hasOwnProperty('uniqueItems') && schema.uniqueItems) {
    v = addConstraint(v, constraint('unique'))
  }
  if (schema.hasOwnProperty('contains')) {
    let subvalidator = generateValidator(schema.contains!)
    let c = constraint('contains', subvalidator)
    v = addConstraint(v, c)
  }
  if (schema.hasOwnProperty('items')) {
    if (Array.isArray(schema.items)) {
      throw new Error('Multiple array items are not supported')
    }
    let subvalidator = generateValidator(schema.items as Schema)
    let c = constraint('items', subvalidator)
    v = addConstraint(v, c)
  }
  return v
}
