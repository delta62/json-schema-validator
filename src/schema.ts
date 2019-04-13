export type Schema = TrueSchema | FalseSchema | ObjectSchema

export default Schema

export type TrueSchema = true

export type FalseSchema = false

export type SchemaType = 'string' | 'boolean' | 'null' | 'object' | 'array' | 'number' | 'integer'

export function isFalseSchema(schema: Schema): schema is FalseSchema {
  return schema === false
}

export function isTrueSchema(schema: Schema): schema is TrueSchema {
  return schema === true
}

interface ObjectSchemaInternal {
  // General validation
  type: SchemaType | SchemaType[]
  enum: any
  const: any

  // Numeric validation
  multipleOf: number
  maximum: number
  exclusiveMaximum: number
  minimum: number
  exclusiveMinimum: number

  // String validation
  maxLength: number
  minLength: number
  pattern: RegExp
  format: string

  // Array validation
  items: Schema | Schema[]
  additionalItems: Schema
  maxItems: number
  minItems: number
  uniqueItems: boolean
  contains: Schema

  // Object validation
  maxProperties: number
  minProperties: number
  required: any[]
  properties: Record<string, Schema>
  patternProperties: Map<RegExp, Schema>
  additionalProperties: Schema
  dependencies: Record<string, string[] | Schema>
  propertyNames: Schema

  // Conditional validation
  if: Schema
  then: Schema
  else: Schema

  // Subschema application
  allOf: Schema[]
  anyOf: Schema[]
  oneOf: Schema[]
  not: Schema

  // Annotations
  title: string
  description: string
  default: any
  examples: any[]
  // Not implemented
  // readOnly: boolean
  // writeOnly: boolean
}

export type ObjectSchema = Partial<ObjectSchemaInternal>
