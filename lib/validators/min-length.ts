import unsafe, { isString } from '../unsafe'

export default function minLengthValidator(expected: number, actual: unsafe): boolean {
  if (!isString(actual)) return true
  return (actual as string).length >= expected
}
