export async function createDeckWithNotes ({ deck, notes }) {
  await ankiConnect('createDeck', { deck })
  await ankiConnect('addNotes', { notes })
}

function ankiConnect (action, params = {}, version = 6) {
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


