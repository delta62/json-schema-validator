import { ObjectSchema } from '../schema'
import generateValidator from './index'
import { Validator, addConstraint, constraint, validator } from './validator'

/* NOT IMPLEMENTED:
 * - additionalProperties
 * - dependencies
 * - propertyNames
 */

export default function generateObjectValidator(schema: ObjectSchema): Validator {
  let v = validator('object')

  if (schema.hasOwnProperty('maxProperties')) {
    v = addConstraint(v, constraint('max', schema.maxProperties))
  }

  if (schema.hasOwnProperty('minProperties')) {
    v = addConstraint(v, constraint('min', schema.minProperties))
  }

  if (schema.hasOwnProperty('required')) {
    v = addConstraint(v, constraint('requiredKeys', ...schema.required!))
  }

  if (schema.hasOwnProperty('properties')) {
    let keyHash = Object.entries(schema.properties!).reduce((acc, [ k, v ]) => {
      acc[k] = generateValidator(v)
      return acc
    }, { } as Record<string, Validator>)
    v = addConstraint(v, constraint('keys', keyHash))
  }

  if (schema.hasOwnProperty('patternProperties')) {
    for (let [ pattern, subschema ] of schema.patternProperties!.entries()) {
      let subvalidator = generateValidator(subschema)
      v = addConstraint(v, constraint('pattern', pattern, subvalidator))
    }
  }

  return v
}
