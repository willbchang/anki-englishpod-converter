import 'dotenv/config'
import { extractLink, extractPDF } from './src/pdf.js'
import { generateDeckWithNotes } from './src/deck.js'
import { sendToAnki } from './src/anki.js'
import fs from 'fs'

extractPDF('test.pdf')
  .then(extractLink)
  .then(fetchResponse)
  .then(generateDeckWithNotes)
  .then(sendToAnki)
  .then(removeAudioFiles)

async function fetchResponse (link) {
  const response = await fetch(link)
  const html = await response.text()
  const url = response.url
  return { html, url }
}

async function removeAudioFiles () {
  const dir = './src/assets/'
  await fs.readdirSync(dir).forEach(f => fs.rmSync(`${dir}/${f}`))
}
