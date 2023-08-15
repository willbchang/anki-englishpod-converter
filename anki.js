function invoke (action, version, params = {}) {
  const url = 'http://127.0.0.1:8765'
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      action,
      version,
      params,
    })
  })
}

await invoke('createDeck', 6, { deck: 'test1' })
const result = await invoke('deckNames', 6)
console.log(`got list of decks: ${result}`)

