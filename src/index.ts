import Args from './args'

import readFile from './readers/file'
import readStdin from './readers/stdin'

import generateSchema from './generators'

export default async function main(args: Args) {
  let schema: string
  if (args.file) {
    schema = await readFile(args.file)
  } else {
    schema = await readStdin()
  }
  let jsonSchema = JSON.parse(schema)
  generateSchema(jsonSchema)
}
