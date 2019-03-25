import { Validator, addConstraint, createValidator, createConstraint } from './validator'
import { ObjectSchema } from '../schema'

const constraintHash: Partial<Record<keyof ObjectSchema, string>> = {
    minimum:          'min',
    maximum:          'max',
    exclusiveMinimum: 'greater',
    exclusiveMaximum: 'less',
    multipleOf:       'multiple'
}

export default function generateNumberSchema(schema: ObjectSchema): Validator {
    return Object.entries(constraintHash).reduce((acc, [ jsonName, joiName ]) => {
        if (schema.hasOwnProperty(jsonName)) {
            let value: number = schema[jsonName as keyof ObjectSchema]
            return addConstraint(acc, createConstraint(joiName!, value))
        }
        return acc
    }, createValidator('number'))
}
