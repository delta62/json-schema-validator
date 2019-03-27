import { Constraint, Validator } from './generators/validator'

export default function printCode(joiName: string, tree: Validator): string {
  let params = printParams(tree.params)
  let constraints = printConstraints(tree.constraints)
  return `${joiName}.${tree.name}(${params})${constraints}`
}

function printParams(args: any[]): string {
  return args.map(x => x.toString()).join('')
}

function printConstraints(constraints: Constraint[]) {
  return constraints.reduce((acc, c) => {
    let params = printParams(c.params)
    let txt = `.${c.name}(${params})`
    return acc + txt
  }, '')
}
