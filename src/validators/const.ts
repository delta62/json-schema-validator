export default function validateConst(expected: any, actual: any): boolean {
  return compare(expected, actual)
}

function compare(expected: any, actual: any): boolean {
    if (typeof expected === 'string'
      || typeof expected === 'number'
      || typeof expected === 'boolean'
      || expected === null) return actual === expected

  if (Array.isArray(expected)) {
    if (!Array.isArray(actual)) return false
    return expected.every((item, idx) => compare(item, actual[idx]))
  }

  if (typeof expected === 'object') {
    return typeof actual === 'object'
      && Object.keys(actual).length === Object.keys(expected).length
      && Object.entries(expected).every(([ key, value ]) => {
        return actual.hasOwnProperty(key) && compare(value, actual[key])
      })
  }

  throw new Error(`Unsupported comparison of ${expected}`)
}
