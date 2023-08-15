import { JSDOM } from 'jsdom'

export function generateDeck (html, url) {
  const { document } = (new JSDOM(html)).window
  return {
    deck: getDeckName(),
    notes: generateNotes(),
  }
}

function getDeckName(document, url) {
  const index = url.split('englishpod_')[1]
    .replace('.html', '')
    .replace('0', '')

  const name = document.querySelector('h1:first-child a')
    .textContent
    .replace(/^.*- /, '')
    .replace('!', '')

  return 'EnglishPod 365::' + index + ' ' + name
}

function generateNotes (document) {
  const tds = [...document.querySelectorAll('h1:not(:first-child) + table tr td:nth-child(odd)')]
  const text = tds.map(td => td.textContent + '<br>')
  return convertTo2DArray(text).map(generateNote)
}

function convertTo2DArray (arr) {
  return Array.from({ length: Math.ceil(arr.length / 2) }, (_, i) => arr.slice(i * 2, i * 2 + 2))
}

function generateNote ([Front, Back]) {
  return {
    deckName: getDeckName(),
    modelName: 'Basic',
    fields: {
      Front,
      Back,
    },
  }
}
