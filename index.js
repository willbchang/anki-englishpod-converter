import { generateDeck } from './deck.js'
import { createDeckWithNotes } from './anki.js'
import { extractPDF, extractLink } from './pdf.js'

extractPDF('test.pdf')
  .then(extractLink)
  .then(fetch)
  .then(response => response.text())
  .then(generateDeck)
  .then(createDeckWithNotes)




