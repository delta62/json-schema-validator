import unsafe from '../unsafe'
import validateConst from './const'

export default function enumValidator(expected: any[], actual: unsafe): boolean {
  return expected.some(allowed => validateConst(allowed, actual))
}
