import { Schema } from './schema'

type PropValidatorFunction = (prop: any) => boolean

function typeofValidator(type: string): PropValidatorFunction {
    return prop => typeof prop === type
}

function instanceofValidator(klass: any): PropValidatorFunction {
    return prop => prop instanceof klass
}

function schemaValidator(): boolean {
    return false
}

const numberValidator = typeofValidator('number')
const regexValidator = instanceofValidator(RegExp)
const boolValidator = typeofValidator('boolean')

const KNOWN_PROPS: Record<string, PropValidatorFunction> = {
    // String validation
    maxLength: numberValidator,
    minLength: numberValidator,
    pattern: regexValidator,

    // Numeric validation
    exclusiveMaximum: numberValidator,
    exclusiveMinimum: numberValidator,
    minimum: numberValidator,
    maximum: numberValidator,
    multipleOf: numberValidator,

    // Array validation
    contains: schemaValidator,
    items: schemaValidator,
    maxItems: numberValidator,
    minItems: numberValidator,
    uniqueItems: boolValidator
}

interface ValidationResults {
    unknownKeys: string[]
    invalidKeys: string[]
    pass: boolean
    schema?: Schema
}

export default function validateSchema(schema: any): ValidationResults {
    if (typeof schema === 'boolean') {
        return { unknownKeys: [ ], invalidKeys: [ ], pass: true, schema }
    }
    if (schema === null || typeof schema !== 'object') {
        return { unknownKeys: [ ], invalidKeys: [ ], pass: false }
    }

    let seed: ValidationResults = { unknownKeys: [ ], invalidKeys: [ ], pass: true }
    return Object.entries(schema).reduce((acc, [ key, value ]) => {
        if (!KNOWN_PROPS.hasOwnProperty(key)) {
            acc.unknownKeys.push(key)
        } else if (!KNOWN_PROPS[key](value)) {
            acc.invalidKeys.push(key)
            acc.pass = false
        }
        return acc
    }, seed)
}
