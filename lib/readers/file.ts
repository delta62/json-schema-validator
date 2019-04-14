import * as fs from 'fs'
import { promisify } from 'util'

export default async function readFile(filePath: string) {
  let readFile = promisify(fs.readFile)
  return readFile(filePath, { encoding: 'utf8' })
}
