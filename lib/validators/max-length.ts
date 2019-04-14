import unsafe, { isString } from '../unsafe'

export default function maxLengthValidator(expected: number, actual: unsafe): boolean {
  if (!isString(actual)) return true
  return (actual as string).length <= expected
}
