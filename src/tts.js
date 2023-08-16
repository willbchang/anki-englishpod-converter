import fs from 'fs'

export function fetchTTS (text) {
  const url = `https://${process.env.AZURE_REGION}.tts.speech.microsoft.com/cognitiveservices/v1`
  const config = {
    method: 'POST',
    headers: {
      'Ocp-Apim-Subscription-Key': process.env.AZURE_SUBSCRIPTION_KEY,
      'Content-Type': 'application/ssml+xml',
      'X-Microsoft-OutputFormat': 'audio-16khz-32kbitrate-mono-mp3',
      'User-Agent': 'Anki',
    },
    body: `
<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="en-US">
    <voice name="en-US-JennyMultilingualV2Neural">
        ${text}
    </voice>
</speak>
`
  }

  return fetch(url, config)
    .then(response => response.arrayBuffer())
    .then(Buffer.from)
    .catch(error => console.error('Error:', error))
}

export function saveAsMp3 (buffer, filename) {
  fs.writeFileSync(`./src/assets/${filename}.mp3`, buffer)
  return filename
}

