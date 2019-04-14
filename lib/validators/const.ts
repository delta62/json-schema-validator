import { isArray, isString, isNumber, isBoolean, isNull, isObject, unsafe } from '../unsafe'

export default function validateConst(expected: any, actual: unsafe): boolean {
  return compare(expected, actual)
}

function compare(expected: any, actual: unsafe): boolean {
    if (isString(actual)
      || isNumber(actual)
      || isBoolean(actual)
      || isNull(actual)) return actual === expected

  if (isArray(expected)) {
    if (!isArray(actual)) return false
    return expected.length === (actual as unsafe[]).length
      && expected.every((item, idx) => compare(item, actual[idx]))
  }

  if (isObject(expected)) {
    if (!isObject(actual)) return false

    let expectedEntries = Object.entries(expected)
    if (Object.keys(actual).length !== expectedEntries.length) return false

    return expectedEntries.every(([ key, value ]) => {
        return compare(value, actual[key])
      })
  }

  throw new Error(`Unsupported comparison of ${expected}`)
}
