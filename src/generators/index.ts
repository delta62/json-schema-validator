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
    return generateTrueValidator()
  } else if (isFalseSchema(schema)) {
    return generateFalseValidator()
  } else if (!schema.hasOwnProperty('type')) {
    return generateAnyValidator(schema)
  } else {
    switch (schema.type) {
      case 'string':
        validator = generateStringValidator(schema)
        break
      case 'integer':
      case 'number':
        validator = generateNumberValidator(schema)
        break
      case 'array':
        validator = generateArrayValidator(schema)
        break
      case 'null':
      case 'object':
      case 'boolean':
      default:
        throw new Error(`Validators for ${schema.type} are not implemented yet`)
    }
  }

  return mixinConstraints(validator, generateAnyValidator(schema))
}
