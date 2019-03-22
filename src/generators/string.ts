import { strict as assert } from 'assert'
import { ObjectSchema } from '../schema'

export default function generateStringSchema(schema: ObjectSchema) {
    assert.equal(schema.type, 'string')

    let validator = 'joi.string()'

    if (schema.minLength !== undefined) {
        validator += `.min(${schema.minLength})`
    }
    if (schema.maxLength !== undefined) {
        validator += `.max(${schema.maxLength})`
    }
    if (schema.pattern !== undefined) {
        validator += `.regex(${schema.pattern})`
    }
    return validator
}
