import Args from './args'
import readFile from './readers/file'
import readStdin from './readers/stdin'

export default async function main(args: Args) {
  let schema: string
  if (args.file) {
    schema = await readFile(args.file)
  } else {
    schema = await readStdin()
  }
  console.log(schema)
}
