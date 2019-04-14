import unsafe from '../unsafe'
import { Schema } from '../schema'
import validateSchema from './schema'

export default function validateOneOf(expected: Schema[], actual: unsafe): boolean {
  return expected.filter(schema => validateSchema(schema, actual)).length === 1
}
