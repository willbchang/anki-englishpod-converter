import { PDFExtract } from 'pdf.js-extract'
import fs from 'fs'

export function extractPDF (filepath) {
  const pdfExtract = new PDFExtract()
  const buffer = fs.readFileSync(filepath)
  const options = {}
  return pdfExtract.extractBuffer(buffer, options);
}

export function extractLink (data) {
  const link =  data.pages
    .map(page => page.links.find(link => link.includes('s3.amazonaws.com')))
    .find(link => link)
  return fixLink(link)
}

function fixLink (link) {
  if (!link) return
  const index = link.match(/\/[0-9]{4}\//)[0].replaceAll('/', '')
  let result = link.replace('extra/')
  if (link.endsWith('pdf/')) result += 'englishpod_' + index + '.html'
  return result
}
