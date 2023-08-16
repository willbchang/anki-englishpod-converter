import fs from 'fs'

function fetchTTS (text) {
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
    .catch(error => console.error('Error:', error))
}

function saveAsMp3 (arrayBuffer) {
  const buffer = Buffer.from(arrayBuffer)
  fs.writeFileSync('assets/output.mp3', buffer)
}
