import { Schema } from '../schema'
import unsafe, { isArray } from '../unsafe'
import schemaValidator from './schema'

export default function itemsValidator(expected: Schema | Schema[], actual: unsafe): boolean {
  if (!isArray(actual)) return true
  if (isArray(expected)) {
    return expected.every((ex, idx) => schemaValidator(ex, actual[idx]))
  }
  return (actual as unsafe[]).every(item => schemaValidator(expected as Schema, item))
}
