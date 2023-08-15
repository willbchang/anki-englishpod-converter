export async function createDeckWithNotes ({ deck, notes }) {
  await ankiConnect('createDeck', { deck })
  await ankiConnect('addNotes', { notes })
}

async function ankiConnect (action, params = {}, version = 6) {
  const url = 'http://127.0.0.1:8765'
  const config = {
    method: 'POST',
    body: JSON.stringify({
      action,
      version,
      params,
    })
  }

  try {
    const response = await fetch(url, config)
    const { result, error } = await response.json()
    if (error) console.error(error)
    console.log(action, 'is successful', result)
    return result
  } catch (error) {
    console.error(error)
  }
}


