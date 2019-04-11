import unsafe from '../unsafe'
import { isTrueSchema } from '../generators/true'
import { isFalseSchema } from '../generators/false'
import { Schema } from '../schema'

type Assertion = (expected: any, actual: unsafe) => boolean

import typeValidator from './type'
import enumValidator from './enum'
import constValidator from './const'

const ASSERTIONS: Record<string, Assertion> = {
  type: typeValidator,
  enum: enumValidator,
  const: constValidator
}

export default function validate(schema: Schema, instance: unsafe): boolean {
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
