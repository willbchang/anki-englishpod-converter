createDeck()
export async function createDeck (params) {
  await invoke('createDeck', 6, { deck: 'test1' })
  const result = await invoke('deckNames', 6)
  console.log(result)
}

function invoke (action, version, params = {}) {
  const url = 'http://127.0.0.1:8765'
  const config = {
    method: 'POST',
    body: JSON.stringify({
      action,
      version,
      params,
    })
  }
  return fetch(url, config)
    .then(response => response.json())
}


