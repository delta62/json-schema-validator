import { Schema } from '../schema'
import { validator } from './validator'

export default function generateAnyValidator(_schema: Schema) {
  return validator('any')
}
