import { Schema } from '../schema'
import unsafe, { isArray } from '../unsafe'
import constValidator from './const'

export default function containsValidator(expected: Schema, actual: unsafe): boolean {
  if (!isArray(actual)) return true
  return (actual as unsafe[]).find(item => constValidator(expected, item)) !== undefined
}
