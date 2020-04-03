const syllableExpression = /[^aeiouy]*[aeiouy]+(?:[^aeiouy]*$|[^aeiouy](?=[^aeiouy]))?/gi
const SyllableUtility = {
  findSyllables(_word) {
    return _word.match(syllableExpression)
  },
  breakUpLongSyllables(_syllableArr) {
    var splitWord = []
    for (const syllable of _syllableArr) {
      // If the given syllable is larger than the threshold, it is broken up
      if (syllable.length > 2) {
        var splitSyllable = [[]]
        for (const letter of syllable) {
          const lastElementLocation = splitSyllable.length - 1
          if (splitSyllable[lastElementLocation].length < 2) {
            splitSyllable[lastElementLocation].push(letter)
          } else {
            const letterPair = [letter]
            splitSyllable.push(letterPair)
          }
        }
        splitSyllable.forEach(twoLetterCombination => {
          splitWord.push(twoLetterCombination)
        })
      } else {
        splitWord.push([syllable])
      }
    }
    return splitWord
  }
}
export default SyllableUtility
