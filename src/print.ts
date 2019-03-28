import { Constraint, Validator, isValidator } from './generators/validator'

export default function printCode(joiName: string, tree: Validator): string {
  let params = printParams(joiName, tree.params)
  let constraints = printConstraints(joiName, tree.constraints)
  return `${joiName}.${tree.name}(${params})${constraints}`
}

function printParams(joiName: string, args: any[]): string {
  return args.map(a => printParam(joiName, a)).join(', ')
}

function printParam(joiName: string, param: any): string {
  if (
    [ 'string', 'number'].includes(typeof param)
    || param === null
    || param instanceof RegExp
  ) {
    return param.toString()
  }

  if (Array.isArray(param)) {
    return printArray(joiName, param)
  }

  if (isValidator(param)) {
    return printCode(joiName, param)
  }

  if (typeof param === 'object') {
    return printObject(joiName, param)
  }

  throw new Error(`Unable to print param ${param}`)
}

function printArray(joiName: string, array: any[]): string {
  let items = array.map(a => printParam(joiName, a)).join(',')
  return `[${items}]`
}

function printObject(joiName: string, o: object): string {
  let items = Object.entries(o).reduce((acc, [ k, v ], i, entries) => {
    acc += `"${k}":` + printParam(joiName, v)
    if (i < entries.length - 1) {
      acc += ','
    }
    return acc
  }, '')
  return `{${items}}`
}

function printConstraints(joiName: string, constraints: Constraint[]) {
  return constraints.reduce((acc, c) => {
    let params = printParams(joiName, c.params)
    let txt = `.${c.name}(${params})`
    return acc + txt
  }, '')
}
