import { extractLink, extractPDF } from './src/pdf.js'
import { generateDeck } from './src/deck.js'
import { createDeckWithNotes } from './src/anki.js'

extractPDF('test.pdf')
  .then(extractLink)
  .then(fetchResponse)
  .then(generateDeck)
  .then(createDeckWithNotes)

async function fetchResponse (link) {
  const response = await fetch(link)
  const html = await response.text()
  const url = response.url
  return { html, url }
}
