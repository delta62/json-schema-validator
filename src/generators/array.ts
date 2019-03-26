import generateValidator from './index'
import { Validator, addConstraint, createValidator, createConstraint } from './validator'
import { ObjectSchema, Schema } from '../schema'

export default function generateNumberSchema(schema: ObjectSchema): Validator {
  let validator = createValidator('array')
  if (schema.hasOwnProperty('maxItems')) {
    validator = addConstraint(validator, createConstraint('max', schema.maxItems))
  }
  if (schema.hasOwnProperty('minItems')) {
    validator = addConstraint(validator, createConstraint('min', schema.minItems))
  }
  if (schema.hasOwnProperty('uniqueItems') && schema.uniqueItems) {
    validator = addConstraint(validator, createConstraint('unique'))
  }
  if (schema.hasOwnProperty('contains')) {
    let subvalidator = generateValidator(schema.contains!)
    let constraint = createConstraint('contains', subvalidator)
    validator = addConstraint(validator, constraint)
  }
  if (schema.hasOwnProperty('items')) {
    if (Array.isArray(schema.items)) {
      throw new Error('Multiple array items are not supported')
    }
    let subvalidator = generateValidator(schema.items as Schema)
    let constraint = createConstraint('items', subvalidator)
    validator = addConstraint(validator, constraint)
  }
  return validator
}