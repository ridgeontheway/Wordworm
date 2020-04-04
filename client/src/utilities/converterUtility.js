var sampleRate = 0
const ConverterUtility = {
  setSampleRate(_sampleRate) {
    console.log('sampleRate = ', sampleRate)
    sampleRate = _sampleRate
  },
  isValidOutSampleRate(buffer, outSampleRate) {
    if (outSampleRate === sampleRate) return buffer
    else if (outSampleRate > sampleRate) return false
    else return true
  },
  /**
   * Down-samples float32-bit audio buffer -> Int16 Array based on down-sampling rate. Necessary for real-time audio streaming.
   * Function provided (and modified) from https://github.com/vin-ni/Google-Cloud-Speech-Node-Socket-Playground/blob/master/src/public/js/client.js
   */
  downSampleAudioBuffer(buffer, outSampleRate) {
    const validDownSamplingRate = this.isValidOutSampleRate(
      buffer,
      outSampleRate
    )
    // Determining if outSampleRate is valid given buffer
    if (!validDownSamplingRate)
      throw 'downsampling rate show be smaller than original sample rate'
    else if (validDownSamplingRate === buffer) return buffer

    const sampleRateRatio = sampleRate / outSampleRate
    const newLength = Math.round(buffer.length / sampleRateRatio)
    const result = new Int16Array(newLength)

    // Used to keep-track of which array element is currently being offset (initial val = 0, final val = result.length )
    var offsetResult = 0
    // Buffer value being used as the start of the offset 'range' (offsetBuffer -> ... -> nextOffsetBuffer)
    var offsetBuffer = 0

    while (offsetResult < result.length) {
      // Defining the end of the 'range' for a given element/index in result (range_start = offsetBuffer, range_end = nextOffsetBuffer)
      const nextOffsetBuffer = Math.round((offsetResult + 1) * sampleRateRatio)
      // accumulator = contains the addition of all buffer values from offsetBuffer -> nextOffsetBuffer - 1
      // count = indicated 'distance' between offsetBuffer -> nextOffsetBuffer
      var accumulator = 0,
        count = 0
      // accumulating buffer values needed to offset result[offsetResult] (i = offsetBuffer .... -> nextOffsetBuffer)
      for (
        var i = offsetBuffer;
        i < nextOffsetBuffer && i < buffer.length;
        i++
      ) {
        accumulator += buffer[i]
        count++
      }

      // down-sampling audio-data (0x7fff === 32767)
      result[offsetResult] = Math.min(1, accumulator / count) * 0x7fff
      offsetResult++
      offsetBuffer = nextOffsetBuffer
    }
    // Array.buffer -> represents generic Int16 fixed-length binary array
    return result.buffer
  }
}

export default ConverterUtility
