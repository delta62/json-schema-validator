import { Validator, Constraint, addConstraint, validator, constraint } from './validator'
import { ObjectSchema } from '../schema'

type Format =
  | 'date-time'
  | 'date'
  | 'email'
  | 'idn-email'
  | 'hostname'
  | 'ipv4'
  | 'ipv6'
  | 'uri'

const constraintHash: Partial<Record<keyof ObjectSchema, string>> = {
  minLength: 'min',
  maxLength: 'max',
  pattern:   'regex'
}

export default function generateStringSchema(schema: ObjectSchema): Validator {
  let v =  Object.entries(constraintHash).reduce((acc, [ jsonName, joiName ]) => {
    if (schema.hasOwnProperty(jsonName)) {
      let value: number = schema[jsonName as keyof ObjectSchema]
      return addConstraint(acc, constraint(joiName!, value))
    }
    return acc
  }, validator('string'))

  if (schema.hasOwnProperty('format')) {
    v = addConstraint(v, format(schema.format as Format))
  }

  return v
}

function format(format: Format): Constraint {
  switch (format) {
    case 'date-time':
    case 'date':
      return constraint('isoDate')
    case 'email':
      return constraint('email', { allowUnicode: false })
    case 'idn-email':
      return constraint('email', { allowUnicode: true })
    case 'uri':
      return constraint('uri')
    case 'ipv4':
    case 'ipv6':
      return constraint('ip', { version: [ format ] })
    case 'hostname':
      return constraint('hostname')
    default:
      throw new Error(`Unsupported format "${format}"`)
  }
}
