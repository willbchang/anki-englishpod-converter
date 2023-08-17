import 'dotenv/config'
import { extractLink, extractPDF } from './src/pdf.js'
import { generateDeckWithNotes } from './src/deck.js'
import { sendToAnki } from './src/anki.js'
import fs from 'fs'
import os from 'os'

englishPodToAnki()

async function englishPodToAnki () {
  const dir = `${os.homedir()}/Documents/Bookshelf/English/EnglishPod/`
  for (let filepath of fs.readdirSync(dir)) {
    await convertEnglishPodToAnki(dir + filepath)
  }
}

function convertEnglishPodToAnki (filepath) {
  return extractPDF(filepath)
    .then(extractLink)
    .then(fetchResponse)
    .then(generateDeckWithNotes)
    .then(sendToAnki)
    .then(removeAudioFiles)
    .catch(console.error)
}

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
