import { isTrueSchema } from '../generators/true'
import { isFalseSchema } from '../generators/false'
import { Schema } from '../schema'

import typeValidator from './type'
import enumValidator from './enum'

const ASSERTIONS = {
  type: typeValidator,
  enum: enumValidator
}

export default function validate(schema: Schema, instance: any): boolean {
  if (isTrueSchema(schema)) {
    return true
  }
  if (isFalseSchema(schema)) {
    return false
  }

  return Object.entries(ASSERTIONS).every(([ key, validator ]) => {
    if (schema.hasOwnProperty(key)) {
      return validator(schema[key as keyof Schema], instance)
    } else {
      return true
    }
  })
}
