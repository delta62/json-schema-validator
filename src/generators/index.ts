import { Schema } from '../schema'
import { Validator, mixinConstraints } from './validator'

import generateFalseValidator, { isFalseSchema } from './false'
import generateTrueValidator, { isTrueSchema } from './true'
import generateAnyValidator from './any'
import generateArrayValidator from './array'
import generateNumberValidator from './number'
import generateStringValidator from './string'

export default function generateValidator(schema: Schema): Validator {
  let validator: Validator

  if (isTrueSchema(schema)) {
    validator = generateTrueValidator()
  } else if (isFalseSchema(schema)) {
    validator = generateFalseValidator()
  } else {
    switch (schema.type) {
      case 'string':
        validator = generateStringValidator(schema)
      case 'integer':
      case 'number':
        validator = generateNumberValidator(schema)
      case 'array':
        validator = generateArrayValidator(schema)
      case 'null':
      case 'object':
      case 'boolean':
      default:
        throw new Error(`Validators for ${schema.type} are not implemented yet`)
    }
  }

  return mixinConstraints(validator, generateAnyValidator(schema))
}
