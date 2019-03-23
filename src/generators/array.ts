import { Validator, addConstraint, createValidator, singletonConstraint } from './generator'
import { ObjectSchema } from '../schema'

export default function generateNumberSchema(schema: ObjectSchema): Validator {
  let validator = createValidator('array')
  if (schema.hasOwnProperty('maxItems')) {
    validator = addConstraint(validator, singletonConstraint('max', schema.maxItems))
  }
  if (schema.hasOwnProperty('minItems')) {
    validator = addConstraint(validator, singletonConstraint('min', schema.minItems))
  }
  if (schema.uniqueItems) {
    validator = addConstraint(validator, { name: 'unique', params: [ ] })
  }
  return validator
}
