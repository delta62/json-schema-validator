import Args from './args'
import readFile from './readers/file'
import readStdin from './readers/stdin'
import generate from './generate'

export default async function main(args: Args) {
  let schema: string
  if (args.file) {
    schema = await readFile(args.file)
  } else {
    schema = await readStdin()
  }
  let jsonSchema = JSON.parse(schema)
  process.stdout.write(generate(jsonSchema))
}
