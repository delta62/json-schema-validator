import { Validator, addConstraint, createValidator } from './generator'
import { ObjectSchema } from '../schema'

export default function generateNumberSchema(schema: ObjectSchema): Validator {
    let validator = createValidator('number')

    if (schema.minimum !== undefined) {
        validator = minConstraint(validator, schema.minimum)
    }
    if (schema.maximum !== undefined) {
        validator = maxConstraint(validator, schema.maximum)
    }
    if (schema.multipleOf !== undefined) {
        validator = multipleOf(validator, schema.multipleOf)
    }
    if (schema.exclusiveMaximum !== undefined) {
        validator = exclusiveMax(validator, schema.exclusiveMaximum)
    }
    if (schema.exclusiveMinimum !== undefined) {
        validator = exclusiveMin(validator, schema.exclusiveMinimum)
    }

    return validator
}

function exclusiveMin(validator: Validator, value: number): Validator {
    return addConstraint(validator, {
        name: 'greater',
        params: [ value ]
    })
}

function exclusiveMax(validator: Validator, value: number): Validator {
    return addConstraint(validator, {
        name: 'less',
        params: [ value ]
    })
}

function multipleOf(validator: Validator, value: number): Validator {
    return addConstraint(validator, {
        name: 'multiple',
        params: [ value ]
    })
}

function minConstraint(validator: Validator, value: number): Validator {
    return addConstraint(validator, {
        name: 'min',
        params: [ value ]
    })
}

function maxConstraint(validator: Validator, value: number): Validator {
    return addConstraint(validator, {
        name: 'max',
        params: [ value ]
    })
}
