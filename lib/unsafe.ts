export type unsafe = never

export default unsafe

export function isString(value: any): value is string {
  return typeof value === 'string'
}

export function isNumber(value: any): value is number {
  return typeof value === 'number' && value !== Infinity
}

export function isNull(value: any): value is null {
  return value === null
}

export function isBoolean(value: any): value is boolean {
  return typeof value === 'boolean'
}

export function isArray(value: any): value is unsafe[] {
  return Array.isArray(value)
}

export function isObject(value: any): value is Record<string, unsafe> {
  return typeof value === 'object' && !isNull(value) && !isArray(value)
}

export function isInteger(value: any): value is number {
  return isNumber(value) && Math.floor(value) === value
}
