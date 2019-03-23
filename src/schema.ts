export type Schema = TrueSchema | FalseSchema | ObjectSchema

export type TrueSchema = true

export type FalseSchema = false

export type RootSchema = ObjectSchema & { $schema: string }

export interface ObjectSchemaInternal {
  // General validation
  type: string | string[]
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

  // format not implemented

  // Annotations
  title: string
  description: string
  default: any
  readOnly: boolean
  writeOnly: boolean
  examples: any[]
}

export type ObjectSchema = Partial<ObjectSchemaInternal>
