import Args from './args'

import readFile from './readers/file'
import readStdin from './readers/stdin'

import generateSchema from './generators'
import printCode from './print'

export default async function main(args: Args) {
  let schema: string
  if (args.file) {
    schema = await readFile(args.file)
  } else {
    schema = await readStdin()
  }

  let jsonSchema = JSON.parse(schema)
  let schemaTree = generateSchema(jsonSchema)
  let code = printCode(args.name, schemaTree)

  process.stdout.write(code)
}
