import unsafe, { isBoolean, isInteger, isString, isNumber, isObject, isArray, isNull } from '../unsafe'
import { SchemaType } from '../schema'

export default function typeValidator(
  typ: SchemaType | SchemaType[], instance: unsafe
): boolean {
  if (typeof typ === 'string') {
    typ = [ typ ]
  }
  return typ.some(t => isScalarType(t, instance))
}

function isScalarType(expected: SchemaType, actual: unsafe): boolean {
  switch (expected) {
    case 'boolean':
      return isBoolean(actual)
    case 'string':
      return isString(actual)
    case 'number':
      return isNumber(actual)
    case 'integer':
      return isInteger(actual)
    case 'object':
      return isObject(actual)
    case 'array':
      return isArray(actual)
    case 'null':
      return isNull(actual)
    default:
      return false
  }
}
