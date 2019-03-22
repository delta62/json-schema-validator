import './matchers/to-generate-schema'

test('generates true schema', () => {
    expect(true).toGenerateSchema('joi.any()')
})

test('generates false schema', () => {
    expect(false).toGenerateSchema('joi.any().forbidden().required()')
})

test('generates string schema', () => {
    expect({ type: 'string' }).toGenerateSchema('joi.string()')
})

test('generates min length string', () => {
    expect({
        type: 'string',
        minLength: 42
    })
    .toGenerateSchema('joi.string().min(42)')
})

test('generates max length string', () => {
    expect({
        type: 'string',
        maxLength: 42
    })
    .toGenerateSchema('joi.string().max(42)')
})

test('generates regex string', () => {
    expect({
        type: 'string',
        pattern: /^foo|bar$/
    })
    .toGenerateSchema('joi.string().regex(/^foo|bar$/)')
})
