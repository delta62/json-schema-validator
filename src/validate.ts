import { Schema } from './schema'

type PropValidatorFunction = (prop: any) => boolean

function typeofValidator(type: string): PropValidatorFunction {
  return prop => typeof prop === type
}

function instanceofValidator(klass: any): PropValidatorFunction {
  return prop => prop instanceof klass
}

function schemaValidator(schema: any): boolean {
  let result = validateSchema(schema)
  return result.pass
}

function numberValidator(num: any): boolean {
  return typeof num === 'number' && num !== Infinity
}

function arrayValidator(itemValidator: PropValidatorFunction): PropValidatorFunction {
  return (array: any) => {
    if (!Array.isArray(array)) return false
    return array.every(itemValidator)
  }
}

function objectValidator(itemValidator: PropValidatorFunction): PropValidatorFunction {
  return (obj: any) => {
    if (typeof obj !== 'object' || obj === null) return false
    return Object.values(obj).every(itemValidator)
  }
}

const boolValidator = typeofValidator('boolean')
const regexValidator = instanceofValidator(RegExp)
const stringValidator = typeofValidator('string')

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
  uniqueItems: boolValidator,

  // Object validation
  maxProperties: numberValidator,
  minProperties: numberValidator,
  required: arrayValidator(stringValidator),
  properties: objectValidator(schemaValidator),
  patternProperties: objectValidator(schemaValidator)
}

export interface ValidationResults {
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
