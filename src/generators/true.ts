import { Schema, TrueSchema } from '../schema'
import { Validator, createValidator } from './validator'

export function isTrueSchema(schema: Schema): schema is TrueSchema {
  return schema === true
}

export default function generateTrueValidator(): Validator {
  return createValidator('any')
}
