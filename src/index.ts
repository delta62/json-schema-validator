import { Writable } from 'stream'
import { createWriteStream, readFile as fsReadFile } from 'fs'
import { promisify } from 'util'
import * as path from 'path'
import chalk from 'chalk'

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

  let preamble: string
  if (args.preamble !== undefined) {
    preamble = args.preamble
  } else {
    let rf = promisify(fsReadFile)
    let preamblePath = path.join(__dirname, '..', 'resources', 'preamble.js')
    preamble = await rf(preamblePath, { encoding: 'utf8' })
    preamble = preamble.replace('%joiName%', args.name)
  }

  outStream.write(preamble)
  outStream.write(code)
  outStream.write('\n')
}

function validationReport(results: ValidationResults) {
  results.unknownKeys.forEach(k => {
    process.stderr.write(chalk.yellow('WARNING: '))
    process.stderr.write(`Unknown key "${k}"\n`)
  })
  results.invalidKeys.forEach(k => {
    process.stderr.write(chalk.red('ERROR: '))
    process.stderr.write(`Invalid value for key ${k}\n`)
  })
}

function shouldExit(args: Args, results: ValidationResults) {
  return !results.pass || (results.unknownKeys.length > 0 && !args['allow-unknown'])
}
