const fs = require('fs');
const speech = require('@google-cloud/speech');
const recorder = require('node-record-lpcm16');

async function main() {
    const client = new speech.SpeechClient()

    const config = {
        encoding: 'LINEAR16',
        sampleRateHertz: 16000,
        languageCode: 'en-US'
    }

    const request = {
        config: config,
        interimResults: false
    }  

    // Create a recognize stream
    const recognizeStream = client
    .streamingRecognize(request)
    .on('error', console.error)
    .on('data', data =>
        process.stdout.write(
            data.results[0] && data.results[0].alternatives[0]
            ? `Transcription: ${data.results[0].alternatives[0].transcript}\n`
            : `\n\nReached transcription time limit, press Ctrl+C\n`
        )
    );
    
    // Start recording and send the microphone input to the Speech API.
    // Ensure SoX is installed, see https://www.npmjs.com/package/node-record-lpcm16#dependencies
    recorder
    .record({
        sampleRateHertz: config.sampleRateHertz,
        threshold: 0,
        // Other options, see https://www.npmjs.com/package/node-record-lpcm16#options
        verbose: false,
        recordProgram: 'rec', // Try also "arecord" or "sox"
        silence: '10.0',
    })
    .stream()
    .on('error', console.error)
    .pipe(recognizeStream);
}

main().catch(console.error)