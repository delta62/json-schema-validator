import generateValidator from './index'
import { Validator, addConstraint, createValidator, singletonConstraint } from './validator'
import { ObjectSchema } from '../schema'

export default function generateNumberSchema(schema: ObjectSchema): Validator {
  let validator = createValidator('array')
  if (schema.hasOwnProperty('maxItems')) {
    validator = addConstraint(validator, singletonConstraint('max', schema.maxItems))
  }
  if (schema.hasOwnProperty('minItems')) {
    validator = addConstraint(validator, singletonConstraint('min', schema.minItems))
  }
  if (schema.hasOwnProperty('uniqueItems') && schema.uniqueItems) {
    validator = addConstraint(validator, { name: 'unique', params: [ ] })
  }
  if (schema.hasOwnProperty('contains')) {
    validator = addConstraint(validator, generateValidator(schema.contains!))
  }
  return validator
}
