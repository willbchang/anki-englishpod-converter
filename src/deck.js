import { JSDOM } from 'jsdom'
import { fetchTTS, saveAsMp3 } from './tts.js'

export async function generateDeckWithNotes ({ html, url }) {
  const { document } = (new JSDOM(html)).window
  console.log(url)

  return {
    deck: getDeckName(),
    notes: await generateNotes(),
  }

  function getDeckName () {
    return 'EnglishPod 365::' + generateDeckNamePrefix() + ' ' + generateDeckNameSuffix()
  }

  function generateDeckNamePrefix () {
    const span = document.querySelector('h1:first-child span').textContent
    const hasLevel = /^[A-Z]/.test(span)
    const prefix = hasLevel ? span : url.split('englishpod_')[1].replace('.html', '')
    return prefix
      .replace(/(\w)(\w+)/g, '$2$1')
      .replace('0', '')
  }

  function generateDeckNameSuffix () {
    return document.querySelector('h1:first-child a')
      .textContent
      .replace(/^.*- /, '')
      .replace('!', '')
  }

  async function generateNotes () {
    const tds = [...document.querySelectorAll('h1:not(:first-child) + table tr td:nth-child(odd)')]
    const text = tds.map(td => td.textContent)
    return Promise.all(convertTo2DArray(text).map(generateNote))
  }

  function convertTo2DArray (arr) {
    return Array.from({ length: Math.ceil(arr.length / 2) }, (_, i) => arr.slice(i * 2, i * 2 + 2))
  }

  async function generateNote ([Front, Back]) {
    return {
      deckName: getDeckName(),
      modelName: 'Basic',
      fields: {
        Front: Front + '<br>',
        Back: Back + '<br>',
      },
      audio: await Promise.all([Front, Back].map(generateAudio)),
      tags: generateTags(),
    }
  }

  function generateTags () {
    const tag = document.querySelector('h1:first-child a')
      .textContent
      .replace(/ - .*/, '')
      .replace(/ /g, '-')
      .toLowerCase()

    return [tag]
  }

  function generateAudio (text, index) {
    const fields = [index === 0 ? 'Front' : 'Back']
    return fetchTTS(text)
      .then(buffer => saveAsMp3(buffer, 'EnglishPod-' + UUID()))
      .then(filename => ({
        path: `${process.cwd()}/src/assets/` + filename + '.mp3',
        filename,
        fields,
      }))
  }

  // https://stackoverflow.com/a/2117523/5520270
  function UUID () {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    )
  }

}
