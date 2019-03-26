import { ObjectSchema } from '../schema'
import { Validator, addConstraint, constraint, validator } from './validator'

/* NOT IMPLEMENTED:
 * - type[]
 */

export default function generateAnyValidator(schema: ObjectSchema): Validator {
  let v = validator('any')

  if (schema.hasOwnProperty('enum')) {
    v = addConstraint(v, constraint('valid', ...schema.enum))
  }

  if (schema.hasOwnProperty('const')) {
    v = addConstraint(v, constraint('valid', schema.const))
  }

  return v
}
