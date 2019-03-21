import Args from './args'
import readStdin from './readers/stdin'

export default async function main(args: Args) {
  let schema = await (args.file ? Promise.resolve(args.file) : readStdin())
  console.log(schema)
}
