export type ValidatorType = 'any' | 'array' | 'number' | 'object' | 'string'

export interface Constraint {
  name: string
  params: any[]
}

export interface Validator extends Constraint {
  constraints: Constraint[]
}

export function validator(type: ValidatorType): Validator {
  return {
    name: type,
    params: [ ],
    constraints: [ ]
  }
}

export function addConstraint(validator: Validator, constraint: Constraint): Validator {
  return {
    name: validator.name,
    constraints: [ ...validator.constraints, constraint ],
    params: [ ]
  }
}

export function constraint(name: string, ...params: any[]): Constraint {
  return { name, params }
}

export function mixinConstraints(source: Validator, dest: Validator): Validator {
  return {
    name: source.name,
    params: [ ],
    constraints: [ ...source.constraints, ...dest.constraints ]
  }
}

export function isValidator(obj: any): obj is Validator {
  return obj && obj.hasOwnProperty('constraints')
}
