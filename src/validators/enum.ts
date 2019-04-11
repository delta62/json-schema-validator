import validateConst from './const'

export default function enumValidator(expected: any[], actual: any): boolean {
  return expected.some(allowed => validateConst(allowed, actual))
}
