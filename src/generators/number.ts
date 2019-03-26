import { Validator, addConstraint, validator, constraint } from './validator'
import { ObjectSchema } from '../schema'

const constraintHash: Partial<Record<keyof ObjectSchema, string>> = {
  minimum:          'min',
  maximum:          'max',
  exclusiveMinimum: 'greater',
  exclusiveMaximum: 'less',
  multipleOf:       'multiple'
}

export default function generateNumberSchema(schema: ObjectSchema): Validator {
  let v =  Object.entries(constraintHash).reduce((acc, [ jsonName, joiName ]) => {
    if (schema.hasOwnProperty(jsonName)) {
      let value: number = schema[jsonName as keyof ObjectSchema]
      return addConstraint(acc, constraint(joiName!, value))
    }
    return acc
  }, validator('number'))

  if (schema.type === 'integer') {
    v = addConstraint(v, constraint('integer'))
  }

  return v
}
