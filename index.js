import { extractLink, extractPDF } from './src/pdf.js'
import { generateDeck } from './src/deck.js'
import { createDeckWithNotes } from './src/anki.js'

extractPDF('test.pdf')
  .then(extractLink)
  .then(fetch)
  .then(response => response.text())
  .then(generateDeck)
  .then(createDeckWithNotes)




