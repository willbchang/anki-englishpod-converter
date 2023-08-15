import {PDFExtract} from 'pdf.js-extract';
import fs from 'fs'
import { getDeck } from './deck.js'
import { createDeckWithNotes } from './anki.js'

extractPDF('test.pdf')
  .then(getLink)
  .then(fetch)
  .then(response => response.text())
  .then(getDeck)
  .then(createDeckWithNotes)

function extractPDF (filepath) {
  const pdfExtract = new PDFExtract()
  const buffer = fs.readFileSync(filepath)
  const options = {}
  return pdfExtract.extractBuffer(buffer, options);
}

function getLink (data) {
  return data.pages
    .map(page => page.links.find(link => link.includes('s3.amazonaws.com')))
    .find(link => link)
}


