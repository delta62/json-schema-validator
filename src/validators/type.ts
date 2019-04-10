export default function typeValidator(typ: string | string[], instance: any): boolean {
  if (typeof typ === 'string') {
    typ = [ typ ]
  }
  return typ.some(t => isScalarType(t, instance))
}

function isScalarType(expected: string, actual: any): boolean {
  switch (expected) {
    case 'boolean':
      return typeof actual === 'boolean'
    case 'string':
      return typeof actual === 'string'
    case 'number':
      return typeof actual === 'number' && actual !== Infinity
    case 'integer':
      return typeof actual === 'number' && Math.floor(actual) === actual
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
