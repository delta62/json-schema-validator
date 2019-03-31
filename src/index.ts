import { Writable } from 'stream'
import { createWriteStream } from 'fs'

import readFile from './readers/file'
import readStdin from './readers/stdin'

import Args from './args'
import generateSchema from './generators'
import printCode from './print'
import validateSchema, { ValidationResults } from './validate'

export default async function main(args: Args) {
  let schema: string
  if (args.file) {
    schema = await readFile(args.file)
  } else {
    schema = await readStdin()
  }

  let jsonSchema = JSON.parse(schema)
  let validationResults = validateSchema(jsonSchema)
  validationReport(validationResults)
  if (shouldExit(args, validationResults)) {
    process.exit(1)
  }

  let schemaTree = generateSchema(jsonSchema)
  let code = printCode(args.name, schemaTree)

  let outStream: Writable
  if (args.output) {
    outStream = createWriteStream(args.output)
  } else {
    outStream = process.stdout
  }
  outStream.write(code)
}

function validationReport(results: ValidationResults) {
  results.unknownKeys.forEach(k => {
    process.stderr.write(`Unknown key "${k}"\n`)
  })
  results.invalidKeys.forEach(k => {
    process.stderr.write(`Invalid value for key ${k}\n`)
  })
}

function shouldExit(args: Args, results: ValidationResults) {
  return !results.pass || (results.unknownKeys.length > 0 && !args['allow-unknown'])
}
