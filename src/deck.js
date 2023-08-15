import { JSDOM } from 'jsdom'

export function generateDeck (html) {
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
