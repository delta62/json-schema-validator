export default async function readStdin() {
  let inputBuffer = Buffer.alloc(0)

  process.stdin.on('data', (data: Buffer) => {
    inputBuffer = Buffer.concat([ inputBuffer, data ])
  })

  return new Promise((resolve, reject) => {
    process.stdin.on('end', () => {
      resolve(inputBuffer.toString('utf8'))
    })

    process.stdin.on('error', reject)
  })
}
