import { Schema } from './schema'

type PropValidatorFunction = (ctx: ValidationContext, prop: any) => ValidationResult

export interface TypeFailure {
  expected: string
  actual: any
}

export interface ValidationResult {
  /** Pairs of path, { expected, actual } */
  invalidKeys: Record<string, TypeFailure>
  /** True if the schema is valid, or false otherwose */
  pass: boolean
  /** pairs of name, path */
  unknownKeys: Record<string, string>
  /** Validated schema if validation succeeded, otherwise undefined */
  schema?: Schema
}

interface ValidationContext {
  path: string
  allowUnknown: boolean
}

const KNOWN_PROPS: Record<string, PropValidatorFunction> = {
  // String validation
  maxLength: numberValidator,
  minLength: numberValidator,
  pattern: stringValidator,

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
  required: arrayValidator(stringValidator, 'string'),
  properties: objectValidator(schemaValidator, 'schema'),
  patternProperties: objectValidator(schemaValidator, 'schema')
}

export default function validate(maybeSchema: any, allowUnknownKeys: boolean): ValidationResult {
  let ctx = { allowUnknown: allowUnknownKeys, path: '' }
  return schemaValidator(ctx, maybeSchema)
}

function schemaValidator(context: ValidationContext, maybeSchema: any): ValidationResult {
  if (typeof maybeSchema === 'boolean') {
    return { ...ok(), schema: maybeSchema }
  }

  if (typeof maybeSchema !== 'object' || maybeSchema === 'null') {
    let failure = { expected: 'object | boolean', actual: printType(maybeSchema) }
    return { ...ok(), invalidKeys: { [context.path]: failure }, pass: false }
  }

  return Object.entries(maybeSchema).reduce((acc, [ k, v ]) => {
    let childPath = appendKey(context.path, k)
    if (KNOWN_PROPS.hasOwnProperty(k)) {
      let childContext = { ...context, path: childPath }
      let propResults = KNOWN_PROPS[k](childContext, v)
      return mergeResults(acc, propResults)
    } else {
      acc.unknownKeys[childPath] = printType(v)
      if (!context.allowUnknown) {
        acc.pass = false
        delete acc.schema
      }
    }
    return acc
  }, { unknownKeys: { }, invalidKeys: { }, pass: true, schema: maybeSchema } as ValidationResult)
}

function mergeResults(a: ValidationResult, b: ValidationResult): ValidationResult {
  let ret: ValidationResult = {
    unknownKeys: { ...a.unknownKeys, ...b.unknownKeys },
    invalidKeys: { ...a.invalidKeys, ...b.invalidKeys },
    pass: a.pass && b.pass,
  }
  if (a.schema) {
    ret.schema = a.schema
  }
  return ret
}

function printType(prop: any): string {
  let type = typeof prop
  if (prop === 'null') return 'null'
  if (type === 'undefined') return 'undefined'
  if (type === 'number') return `${prop}`
  if (type === 'string') return `"${prop}"`
  if (Array.isArray(prop)) {
    return prop.toString()
  }
  return 'object'
}

function numberValidator(context: ValidationContext, x: any): ValidationResult {
  if (typeof x !== 'number' || x === Infinity) {
    return invalidKey(context.path, x, 'number')
  }
  return ok()
}

function stringValidator(context: ValidationContext, x: any): ValidationResult {
  return typeof x === 'string' ? ok() : invalidKey(context.path, x, 'string')
}

function boolValidator(context: ValidationContext, x: any): ValidationResult {
  return typeof x === 'boolean' ? ok() : invalidKey(context.path, x, 'boolean')
}

function arrayValidator(itemValidator: PropValidatorFunction, expectedName: string) {
  return (context: ValidationContext, x: any): ValidationResult => {
    if (!Array.isArray(x)) {
      return invalidKey(context.path, x, 'array')
    }
    return x.reduce((acc, item, i) => {
      let childPath = appendIndex(context.path, i)
      if (itemValidator({ ...context, path: childPath }, item)) {
        return acc
      }
      let err = invalidKey(childPath, item, expectedName)
      return mergeResults(acc, err)
    }, ok())
  }
}

function objectValidator(itemValidator: PropValidatorFunction, expectedName: string) {
  return (context: ValidationContext, x: any): ValidationResult => {
    if (typeof x !== 'object' || x === null) {
      return invalidKey(context.path, x, 'object')
    }
    return Object.entries(x).reduce((acc, [ k, v ]) => {
      let childPath = appendKey(context.path, k)
      if (itemValidator({ ...context, path: childPath }, v)) {
        return acc
      }
      let err = invalidKey(childPath, v, expectedName)
      return mergeResults(acc, err)
    }, ok())
  }
}

function ok(): ValidationResult {
  return {
    unknownKeys: { },
    invalidKeys: { },
    pass: true
  }
}

function invalidKey(path: string, actual: any, expected: string): ValidationResult {
  return {
    unknownKeys: { },
    invalidKeys: {
      [path]: {
        actual: printType(actual),
        expected: expected
      }
    },
    pass: false
  }
}

function appendKey(base: string, addition: string): string {
  return base === '' ? addition : `${base}.${addition}`
}

function appendIndex(base: string, index: number): string {
  return base === '' ? `[${index}]` : `${base}[${index}]`
}
