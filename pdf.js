import { PDFExtract } from 'pdf.js-extract'
import fs from 'fs'

export function extractPDF (filepath) {
  const pdfExtract = new PDFExtract()
  const buffer = fs.readFileSync(filepath)
  const options = {}
  return pdfExtract.extractBuffer(buffer, options);
}

export function getLink (data) {
  return data.pages
    .map(page => page.links.find(link => link.includes('s3.amazonaws.com')))
    .find(link => link)
}
