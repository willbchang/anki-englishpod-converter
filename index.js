import {PDFExtract} from 'pdf.js-extract';
import fs from 'fs'
import { JSDOM } from 'jsdom'
import * as anki from './anki.js'

extractPDF('test.pdf')
  .then(getLink)
  .then(fetch)
  .then(response => response.text())
  .then(getDeck)
  .then(anki.createDeck)

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

function getDeck (html) {
  const { document } = (new JSDOM(html)).window
  return  getDeckName(document) + '\n' + getCardContent(document)

  function getDeckName() {
    const name = document.querySelector('h1:first-child a')
      .textContent
      .replace(/^.*- /, '')
      .replace('!', '')
    const index = document.querySelector('h1:first-child span')
      .textContent
      .replace(/[()]/g, '')
      .replace(/^0/, '')
    return '# EnglishPod 365::' + index + 'B ' + name
  }

  function getCardContent() {
    const tds = [...document.querySelectorAll('h1:not(:first-child) + table tr td:nth-child(odd)')]
    return tds.map((td, index) => {
      const prefix = index % 2 === 0 ? '## ' : ''
      return prefix + td.textContent
    }).join('\n')
  }
}
