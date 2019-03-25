import { Validator, addConstraint, createValidator, createConstraint } from './validator'
import { ObjectSchema } from '../schema'

const constraintHash: Partial<Record<keyof ObjectSchema, string>> = {
    minLength: 'min',
    maxLength: 'max',
    pattern:   'regex'
}

export default function generateStringSchema(schema: ObjectSchema): Validator {
    return Object.entries(constraintHash).reduce((acc, [ jsonName, joiName ]) => {
        if (schema.hasOwnProperty(jsonName)) {
            let value: number = schema[jsonName as keyof ObjectSchema]
            return addConstraint(acc, createConstraint(joiName!, value))
        }
        return acc
    }, createValidator('string'))
}
