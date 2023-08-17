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
    .then(() => moveFileToDone(filepath))
    .then(() => console.log('DONE!'))
    .catch(error => console.error(error))
}

async function fetchResponse (link, count = -1) {
  const response = await fetch(link)
  const levels = ['B', 'C', 'D', 'E']
  let html, url = ''
  if (!response.ok) {
    count += 1
    if (count >= levels.length) throw new Error('No Valid Link')
    const newLink = link.replace(/[A-Z]?(\d+\.html)/, levels[count] + '$1')
    console.log('Link is not Valid: ', response.url)
    console.log('Trying: ', newLink)
    return await fetchResponse(newLink, count)
  } else {
    html = await response.text()
    url = response.url
    console.log('Found Valid Link: ', url)
    return { html, url }
  }
}

async function removeAudioFiles () {
  const dir = './src/assets/'
  await fs.readdirSync(dir).forEach(f => fs.rmSync(`${dir}/${f}`))
}

function moveFileToDone(path) {
  fs.renameSync(path, path.replace('EnglishPod', 'Done'))
}
