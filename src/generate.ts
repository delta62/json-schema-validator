import { ObjectSchema, Schema } from './schema'

export default function generate(schema: Schema): string {
    switch (schema) {
        case true:
            return generateTrueSchema()
        case false:
            return generateFalseSchema()
        default:
            return generateObjectSchema(schema)
    }
}

function generateTrueSchema() {
    return 'joi.any()'
}

function generateFalseSchema() {
    return 'joi.any().forbidden().required()'
}

function generateObjectSchema(schema: ObjectSchema) {
    switch (schema.type) {
        case 'string':
            return 'joi.string()'
        default:
            throw new Error(`Schema type "${schema.type}" not recognized`)
    }
}
