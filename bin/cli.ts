#!/usr/bin/env node

import yargs from 'yargs'
import Args from '../src/args'
import main from '../src/index'

const argv: Args = yargs
  .command('$0', 'Generate Joi validators from a JSON schema')
  .option('file', {
    desc: 'A file to read input from. If ommitted, stdin will be used',
    type: 'string'
  })
  .option('name', {
    default: 'joi',
    desc: 'The name of the joi global to emit in code',
    type: 'string'
  })
  .option('allow-unknown', {
    default: true,
    desc: `Whether or not to allow unknown properties on the schema. Unknown \
properties are ignored.`,
    type: 'boolean'
  })
  .help()
  .argv as yargs.Arguments<Args>

main(argv)
