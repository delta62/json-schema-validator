import { FalseSchema, Schema } from '../schema'

export function isFalseSchema(schema: Schema): schema is FalseSchema {
  return schema === false
}

export default function generateFalseSchema() {
  return {
    name: 'any',
    params: [ ],
    constraints: [
      {
        name: 'required',
        params: [ ]
      },
      {
        name: 'forbidden',
        params: [ ]
      }
    ]
  }
}
