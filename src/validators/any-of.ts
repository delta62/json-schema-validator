import unsafe from '../unsafe'
import { Schema } from '../schema'
import validateSchema from './schema'

export default function validateAnyOf(expected: Schema[], actual: unsafe): boolean {
  return expected.some(schema => validateSchema(schema, actual))
}
