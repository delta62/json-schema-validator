import unsafe from '../unsafe'
import Schema from '../schema'
import validateSchema from './schema'

export default function notValidator(expected: Schema, actual: unsafe): boolean {
  return !validateSchema(expected, actual)
}
