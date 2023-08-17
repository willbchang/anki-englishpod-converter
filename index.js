import 'dotenv/config'
import { extractLink, extractPDF } from './src/pdf.js'
import { generateDeckWithNotes } from './src/deck.js'
import { sendToAnki } from './src/anki.js'
import fs from 'fs'
import os from 'os'

englishPodToAnki()

async function englishPodToAnki () {
  const dir = `${os.homedir()}/Documents/Bookshelf/English/EnglishPod/`
  for (let filename of fs.readdirSync(dir)) {
    await convertEnglishPodToAnki(dir + filename)
  }
}

function convertEnglishPodToAnki (filepath) {
  console.log('Converting ', filepath)
  return extractPDF(filepath)
    .then(extractLink)
    .then(fetchResponse)
    .then(generateDeckWithNotes)
    .then(sendToAnki)
    .then(removeAudioFiles)
    .then(() => moveFileToDir(filepath, 'Done'))
    .then(() => console.log('DONE!'))
    .catch(error => {
      moveFileToDir(filepath, 'Error')
      console.error(error)
    })
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

function moveFileToDir(path, folder) {
  fs.renameSync(path, path.replace('EnglishPod', folder))
}
