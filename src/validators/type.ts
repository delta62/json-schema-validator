import { SchemaType } from '../schema'

export default function typeValidator(
  typ: SchemaType | SchemaType[], instance: any
): boolean {
  if (typeof typ === 'string') {
    typ = [ typ ]
  }
  return typ.some(t => isScalarType(t, instance))
}

function isScalarType(expected: SchemaType, actual: any): boolean {
  switch (expected) {
    case 'boolean':
      return typeof actual === 'boolean'
    case 'string':
      return typeof actual === 'string'
    case 'number':
      return typeof actual === 'number' && actual !== Infinity
    case 'integer':
      return typeof actual === 'number'
        && actual !== Infinity
        && Math.floor(actual) === actual
    case 'object':
      return typeof actual === 'object' && actual !== null
    case 'array':
      return Array.isArray(actual)
    case 'null':
      return actual === null
    default:
      return false
  }
}
