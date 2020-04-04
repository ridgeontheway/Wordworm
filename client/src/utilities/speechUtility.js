import { compareTwoStrings } from 'string-similarity'
import {
  CORRECT,
  INCORRECT,
  UNREAD,
  MINI_GAME_SUCCESS
} from '../containers/reading/Types'
import {
  SPOKEN_CONFIDENCE,
  WORD_SIMILARITY
} from '../constants/SpeechRecginition'
const SpeechUtility = {
  processReducedSpeechData(
    _reducedData,
    currentState,
    currentWordsCorrect,
    currentWordsIncorrect
  ) {
    var highestConfidence = 0
    var speechData = []
    _reducedData.forEach(speechElement => {
      speechElement.forEach(element => {
        const confidence = element['confidence']
        const spokenWords = element['wordArr']
        spokenWords.forEach(word => {
          console.log(word)
          speechData.push({ word, confidence })
        })
        highestConfidence =
          element['confidence'] >= SPOKEN_CONFIDENCE
            ? element['confidence']
            : highestConfidence
      })
    })
    // Pre-check to determine if we need to look though the state to update, if not we return early
    if (highestConfidence === 0) {
      return null
    }
    var updatedState = null
    // Checking for correct words spoken
    const stateUpdatedWithCorrectUtterances = this.checkForCorrectUtterances(
      currentState,
      currentWordsCorrect,
      speechData
    )
    updatedState = stateUpdatedWithCorrectUtterances['state']
    console.log('this is the updated state = ', updatedState)
    const wordsCorrect = stateUpdatedWithCorrectUtterances['correctUtterances']
    // Checking for incorrect words spoken
    const stateUpdatedWithIncorrectUtterances = this.checkForIncorrectUtterances(
      updatedState,
      currentWordsIncorrect,
      speechData
    )
    updatedState = stateUpdatedWithIncorrectUtterances['state']
    const wordsIncorrect =
      stateUpdatedWithIncorrectUtterances['incorrectUtterances']

    return {
      bookContentsLookUp: updatedState,
      wordsSpokenCorrectly: wordsCorrect,
      wordsSpokenIncorrectly: wordsIncorrect
    }
  },
  processReducedMiniGameSpeechData(_reducedData, currentState) {
    var highestConfidence = 0
    var speechData = []
    _reducedData.forEach(speechElement => {
      speechElement.forEach(element => {
        const confidence = element['confidence']
        const spokenWords = element['wordArr']
        spokenWords.forEach(word => {
          console.log(word)
          speechData.push({ word, confidence })
        })
        highestConfidence =
          element['confidence'] >= SPOKEN_CONFIDENCE
            ? element['confidence']
            : highestConfidence
      })
    })
    // Pre-check to determine if we need to look though the state to update, if not we return early
    if (highestConfidence === 0) {
      return null
    }
    var updatedState = null
    // Checking for correct words spoken
    const stateUpdatedWithCorrectUtterances = this.checkForCorrectUtterances(
      currentState,
      0,
      speechData,
      true
    )
    updatedState = stateUpdatedWithCorrectUtterances['state']
    return {
      correctWordLookUp: updatedState
    }
  },
  checkForCorrectUtterances(
    currentState,
    wordsCorrect,
    speechData,
    isMiniGame = false
  ) {
    const updatedState = currentState.map((data, idx) => {
      // The current values in the state
      const stateWord = data['word']
      var stateProgression = data['status']
      // Checking if the state word is correct, if we are focusing on specific syllables, we want to correct the focused ones
      if (stateProgression !== CORRECT) {
        for (var i = 0; i < speechData.length; i++) {
          const {
            confidence: currentConfidence,
            word: currentWord
          } = speechData[i]

          const similarity = compareTwoStrings(currentWord, stateWord)
          // A match has been made
          if (
            (currentWord === stateWord &&
              currentConfidence >= SPOKEN_CONFIDENCE) ||
            similarity >= WORD_SIMILARITY
          ) {
            stateProgression = isMiniGame ? MINI_GAME_SUCCESS : CORRECT
            speechData.splice(i, 1)
            wordsCorrect++
            break
          }
        }
      }
      return { word: stateWord, status: stateProgression }
    })
    return {
      state: updatedState,
      correctUtterances: wordsCorrect
    }
  },
  checkForIncorrectUtterances(currentState, wordsIncorrect, speechData) {
    var incorrectWordRange = []
    const updatedState = currentState.map((data, idx) => {
      // The current values in the state
      const stateWord = data['word']
      var stateProgression = data['status']
      // Checking if the state word is correct
      if (stateProgression === UNREAD && speechData.length >= 1) {
        // The user is trying to say one word at the start of the text presented
        stateProgression = INCORRECT
        speechData.splice(0, 1)
        wordsIncorrect++
      } else {
        if (stateProgression === UNREAD) {
          const incorrectWordStatus = this.isBetweenCorrectWords(
            idx,
            currentState,
            currentState.length,
            incorrectWordRange
          )
          if (incorrectWordStatus['status']) {
            incorrectWordRange = incorrectWordStatus['range']
            stateProgression = INCORRECT
            wordsIncorrect++
          }
        }
      }
      return { word: stateWord, status: stateProgression }
    })
    return {
      state: updatedState,
      incorrectUtterances: wordsIncorrect
    }
  },
  isBetweenCorrectWords(
    currentIndex,
    currentWordsState,
    stateLength,
    incorrectRange
  ) {
    var isBetweenTwoCorrectWords = false
    var incorrectWordsRange = null
    // If the word is either at the beginning or the end of the paragraph
    if (currentIndex === 0 || currentIndex === stateLength - 1) {
      const neighboringWord =
        currentIndex === 0
          ? currentWordsState[currentIndex + 1]
          : currentWordsState[currentIndex - 1]
      isBetweenTwoCorrectWords =
        neighboringWord['status'] === CORRECT ? true : isBetweenTwoCorrectWords
    }
    // If the word is within the incorrect word range
    else if (
      incorrectRange &&
      currentWordsState[currentIndex] === UNREAD &&
      currentIndex >= incorrectRange['leftBound'] &&
      currentIndex <= incorrectRange['rightBound']
    ) {
      isBetweenTwoCorrectWords = true
    }
    // If the word is outside the range
    else {
      // Indices for the left and right bound
      var leftMostNonUNREADIdx = currentIndex,
        rightMostNonUNREADIdx = currentIndex
      // Stop conditions to prevent out-of-bounds array addressing
      var leftBoundFound = false,
        rightBoundFound = false
      while (!leftBoundFound || !rightBoundFound) {
        const { status: leftBoundStatus } = currentWordsState[
          leftMostNonUNREADIdx
        ]
        // If we have reached a stopping condition for the left-bound -- otherwise we continue decrementing
        if (leftMostNonUNREADIdx === 0 || leftBoundStatus !== UNREAD) {
          leftBoundFound = true
        } else if (!leftBoundFound && leftBoundStatus === UNREAD) {
          leftMostNonUNREADIdx--
        }

        const { status: rightBoundStatus } = currentWordsState[
          rightMostNonUNREADIdx
        ]
        // If we have reached a stopping condition for the right-bound -- otherwise we continue incrementing
        if (
          rightMostNonUNREADIdx === stateLength - 1 ||
          rightBoundStatus !== UNREAD
        ) {
          rightBoundFound = true
        } else if (!rightBoundFound && rightBoundStatus === UNREAD) {
          rightMostNonUNREADIdx++
        }
      }

      const { status: finalLeftBoundStatus } = currentWordsState[
        leftMostNonUNREADIdx
      ]
      const { status: finalRightBoundStatus } = currentWordsState[
        rightMostNonUNREADIdx
      ]

      // If we have a valid range (leftBound, .... ,rightBound)
      if (finalLeftBoundStatus !== UNREAD && finalRightBoundStatus !== UNREAD) {
        isBetweenTwoCorrectWords = true
        incorrectWordsRange = {
          leftBound: leftMostNonUNREADIdx,
          rightBound: rightMostNonUNREADIdx
        }
      }
    }
    return {
      status: isBetweenTwoCorrectWords,
      range: incorrectWordsRange
    }
  },
  compareFocusedSyllableWithSpeechData(focusedSyllable, speechData) {}
}
export default SpeechUtility
