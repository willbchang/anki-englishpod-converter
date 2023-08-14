import {PDFExtract} from 'pdf.js-extract';
import fs from 'fs'

const pdfExtract = new PDFExtract();
const buffer = fs.readFileSync("test.pdf");
const options = {};
pdfExtract.extractBuffer(buffer, options, (err, data) => {
  if (err) return console.log(err);
  console.log(data.pages)

  const link = data.pages
    .map(page => page.links.find(link => link.includes('s3.amazonaws.com')))
    .find(link => link)
  console.log(link)
});
