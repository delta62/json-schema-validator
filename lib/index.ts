import chalk from 'chalk'

import readFile from './readers/file'
import readStdin from './readers/stdin'

import Args from './args'
import validateSchema, { ValidationResult } from './validate'

export default async function main(args: Args) {
  let schema: string
  if (args.file) {
    schema = await readFile(args.file)
  } else {
    schema = await readStdin()
  }

  let jsonSchema = JSON.parse(schema)
  let validationResults = validateSchema(jsonSchema, args['allow-unknown'])
  validationReport(validationResults)
  if (shouldExit(args, validationResults)) {
    process.exit(1)
  }
}

function validationReport(results: ValidationResult) {
  Object.entries(results.unknownKeys).forEach(([ k, _v ]) => {
    process.stderr.write(chalk.yellow('WARNING: '))
    process.stderr.write(`Unknown key "${k}"\n`)
  })
  Object.entries(results.invalidKeys).forEach(([ k, v ]) => {
    process.stderr.write(chalk.red('ERROR: '))
    process.stderr.write(`Invalid value for key ${k}: ${v}\n`)
  })
}

function shouldExit(args: Args, results: ValidationResult) {
  return !results.pass || (Object.keys(results.unknownKeys).length > 0 && !args['allow-unknown'])
}
