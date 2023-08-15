import { JSDOM } from 'jsdom'

export function generateDeck (html, url) {
  const { document } = (new JSDOM(html)).window
  return  getDeckName(document, url) + '\n' + getCardContent(document)
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

function getCardContent(document) {
  const tds = [...document.querySelectorAll('h1:not(:first-child) + table tr td:nth-child(odd)')]
  return tds.map((td, index) => {
    const prefix = index % 2 === 0 ? '## ' : ''
    return prefix + td.textContent
  }).join('\n')
}
