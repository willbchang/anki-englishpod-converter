import {PDFExtract} from 'pdf.js-extract';
import fs from 'fs'

const pdfExtract = new PDFExtract();
const buffer = fs.readFileSync("test.pdf");
const options = {};
pdfExtract.extractBuffer(buffer, options, (err, data) => {
  if (err) return console.log(err);

  fetch(getLink(data))
    .then(response => response.text())
    .then(console.log)

});

function getLink (data) {
  return data.pages
    .map(page => page.links.find(link => link.includes('s3.amazonaws.com')))
    .find(link => link)
}
