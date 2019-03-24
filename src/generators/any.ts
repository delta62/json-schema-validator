import { Schema } from '../schema'
import { createValidator } from './validator'

export default function generateAnyValidator(_schema: Schema) {
  return createValidator('any')
}
