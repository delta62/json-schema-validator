import { Schema } from '../schema'
import unsafe from '../unsafe'
import validateSchema from './schema'

export default function allOfValidator(expected: Schema[], actual: unsafe): boolean {
  return expected.every(schema => validateSchema(schema, actual))
}
