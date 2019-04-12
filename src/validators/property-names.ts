import unsafe, { isObject } from '../unsafe'
import { Schema } from '../schema'
import validateSchema from './schema'

export default function propertyNamesValidator(expected: Schema, actual: unsafe): boolean {
  if (!isObject(actual)) return true
  return Object.keys(actual).every(k => validateSchema(expected, k as unsafe))
}
