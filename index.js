import {PDFExtract} from 'pdf.js-extract';
import fs from 'fs'
import { JSDOM } from 'jsdom'


const pdfExtract = new PDFExtract();
const buffer = fs.readFileSync("test.pdf");
const options = {};
pdfExtract.extractBuffer(buffer, options, (err, data) => {
  if (err) return console.log(err);

  fetch(getLink(data))
    .then(response => response.text())
    .then(html => {
      const { document } = (new JSDOM(html)).window
      const deck = getDeckName(document) + '\n' + getCardContent(document)
      console.log(deck)
    })

});

function getLink (data) {
  return data.pages
    .map(page => page.links.find(link => link.includes('s3.amazonaws.com')))
    .find(link => link)
}

function getDeckName(document) {
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

function getCardContent(document) {
  const tds = [...document.querySelectorAll('h1:not(:first-child) + table tr td:nth-child(odd)')]
  return tds.map((td, index) => {
    const prefix = index % 2 === 0 ? '## ' : ''
    return prefix + td.textContent
  }).join('\n')
}
