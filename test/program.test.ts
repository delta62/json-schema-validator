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
