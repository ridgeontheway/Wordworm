import { SpeechClient } from '@google-cloud/speech'

class SpeechToTextService{
    private speechClient
    private recognizeStream

    constructor() {
        this.speechClient = new SpeechClient()
    }

    startRecognitionStream(client, request) {
        this.recognizeStream = this.speechClient.streamingRecognize(request)
        .on('error', (err) => {
            console.error('Error when processing audio: ' + (err && err.code ? 'Code: ' + err.code + ' ' : '') + (err && err.details ? err.details : ''));
            client.emit('googleCloudStreamError', err);
            this.stopRecognitionStream();
        })
        .on('data', (data) => {
            client.emit('speechData', data);

            // if end of utterance, let's restart stream
            // this is a small hack. After 65 seconds of silence, the stream will still throw an error for speech length limit
            if (data.results[0] && data.results[0].isFinal) {
                this.stopRecognitionStream();
                this.startRecognitionStream(client, request);
                console.log('restarted stream serverside');
            }
        });
    }

    /**
     * Closes the recognize stream and wipes it
    */
    stopRecognitionStream() {
        if (this.recognizeStream) {
            this.recognizeStream.end();
        }
        this.recognizeStream = null;
    }

    /**
     * Receives streaming data and writes it to the recognizeStream for transcription
     * 
     * @param {Buffer} data A section of audio data
     */
    receiveData(data) {
        if (this.recognizeStream) {
            this.recognizeStream.write(data);
        }
    }
}  

export const speechToTextService = new SpeechToTextService()