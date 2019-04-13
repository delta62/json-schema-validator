import unsafe from '../unsafe'
import { ObjectSchema, Schema, isTrueSchema, isFalseSchema } from '../schema'

import typeValidator from './type'
import enumValidator from './enum'
import constValidator from './const'

import multipleOfValidator from './multiple-of'
import maximumValidator from './maximum'
import exclusiveMaximumValidator from './exclusive-maximum'
import minimumValidator from './minimum'
import exclusiveMinimumValidator from './exclusive-minimum'

import maxLengthValidator from './max-length'
import minLengthValidator from './min-length'
import patternValidator from './pattern'

import itemsValidator from './items'
import additionalItemsValidator from './additional-items'
import maxItemsValidator from './max-items'
import minItemsValidator from './min-items'
import uniqueItemsValidator from './unique-items'
import containsValidator from './contains'

import maxPropertiesValidator from './max-properties'
import minPropertiesValidator from './min-properties'
import requiredValidator from './required'
import propertiesValidator from './properties'
import patternPropertiesValidator from './pattern-properties'
import additionalPropertiesValidator from './additional-properties'
import propertyNamesValidator from './property-names'
import dependenciesValidator from './dependencies'

import ifValidator from './if'

import allOfValidator from './all-of'
import anyOfValidator from './any-of'
import oneOfValidator from './one-of'
import notValidator from './not'

type Assertion = (expected: any, actual: unsafe, parentSchema: ObjectSchema) => boolean

const ASSERTIONS: Record<string, Assertion> = {
  type: typeValidator,
  enum: enumValidator,
  const: constValidator,
  multipleOf: multipleOfValidator,
  maximum: maximumValidator,
  exclusiveMaximum: exclusiveMaximumValidator,
  minimum: minimumValidator,
  exclusiveMinimum: exclusiveMinimumValidator,
  maxLength: maxLengthValidator,
  minLength: minLengthValidator,
  pattern: patternValidator,
  items: itemsValidator,
  additionalItems: additionalItemsValidator,
  maxItems: maxItemsValidator,
  minItems: minItemsValidator,
  uniqueItems: uniqueItemsValidator,
  contains: containsValidator,
  maxProperties: maxPropertiesValidator,
  minProperties: minPropertiesValidator,
  required: requiredValidator,
  properties: propertiesValidator,
  patternProperties: patternPropertiesValidator,
  additionalProperties: additionalPropertiesValidator,
  dependencies: dependenciesValidator,
  propertyNames: propertyNamesValidator,
  if: ifValidator,
  allOf: allOfValidator,
  anyOf: anyOfValidator,
  oneOf: oneOfValidator,
  not: notValidator
}

export default function validate(schema: Schema, instance: unsafe): boolean {
  if (isTrueSchema(schema)) {
    return true
  }
  if (isFalseSchema(schema)) {
    return false
  }

  return Object.entries(ASSERTIONS).every(([ key, validator ]) => {
    if (schema.hasOwnProperty(key)) {
      return validator(schema[key as keyof Schema], instance, schema)
    } else {
      return true
    }
  })
}
