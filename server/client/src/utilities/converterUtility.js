const ConverterUtility = {
  /**
     * Converts a buffer from float32 to int16. Necessary for streaming.
     * sampleRateHertz of 1600.
     *
     * @param {object} buffer Buffer being converted
   */
  convertFloat32ToInt16 (buffer) {
    let l = buffer.length
    const buf = new Int16Array(l / 3)

    while (l--) {
      if (l % 3 === 0) {
        buf[l / 3] = buffer[l] * 0xFFFF
      }
    }
    return buf.buffer
  }
}

export default ConverterUtility
