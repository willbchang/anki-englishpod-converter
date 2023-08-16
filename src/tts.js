import fs from 'fs'

const url = `https://${process.env.AZURE_REGION}.tts.speech.microsoft.com/cognitiveservices/v1`

const body = `
<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="en-US">
    <voice name="en-US-JennyMultilingualV2Neural">
        Be reverent before the dawning day. Do not think of what will be in a year, or in ten years. Think of to-day.
    </voice>
</speak>
`

fetch(url, {
  method: 'POST',
  headers: {
    'Ocp-Apim-Subscription-Key': process.env.AZURE_SUBSCRIPTION_KEY,
    'Content-Type': 'application/ssml+xml',
    'X-Microsoft-OutputFormat': 'audio-16khz-32kbitrate-mono-mp3',
    'User-Agent': 'Anki',
  },
  body,
})
  .then(response => response.arrayBuffer())
  .then(Buffer.from)
  .then(buffer => fs.writeFileSync('assets/output.mp3', buffer))
  .catch(error => console.error('Error:', error))
