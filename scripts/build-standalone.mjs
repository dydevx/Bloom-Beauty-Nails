import { build } from 'vite'
import { readFile, writeFile } from 'node:fs/promises'

await build()

const builtFile = new URL('../dist/source.html', import.meta.url)
const outputFile = new URL('../index.html', import.meta.url)
const html = await readFile(builtFile, 'utf8')

await writeFile(
  outputFile,
  html
    .replaceAll('href="/media/', 'href="./public/media/')
    .replaceAll('content="/media/', 'content="./public/media/')
    .replaceAll('"/media/', '"./public/media/')
    .replaceAll('`/media/', '`./public/media/'),
  'utf8',
)

console.log('Standalone index.html created successfully.')
