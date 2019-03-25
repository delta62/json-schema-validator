export type ValidatorType = 'any' | 'array' | 'number' | 'string'

export interface Constraint {
    name: string
    params: any[]
}

export interface Validator extends Constraint {
    constraints: Constraint[]
}

export function createValidator(type: ValidatorType): Validator {
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

export function createConstraint(name: string, ...params: any[]): Constraint {
  return { name, params }
}

export function mixinConstraints(source: Validator, dest: Validator): Validator {
  return {
    name: source.name,
    params: [ ],
    constraints: [ ...source.constraints, ...dest.constraints ]
  }
}

