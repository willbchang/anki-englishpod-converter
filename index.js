import { getDeck } from './deck.js'
import { createDeckWithNotes } from './anki.js'
import { extractPDF, getLink } from './pdf.js'

extractPDF('test.pdf')
  .then(getLink)
  .then(fetch)
  .then(response => response.text())
  .then(getDeck)
  .then(createDeckWithNotes)




