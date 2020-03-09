import express from 'express'
import { controller as multimediaDataController } from '../../controllers/MultimediaDataController'

function parseWordRetrievalParameters(reqParams: string[]) {
  const fileNameStr = reqParams[0]
  const startWordStr = reqParams[1]
  const incrementValueStr = reqParams[2]

  var startWord = 0
  var incrementValue = -1

  try {
    startWord = parseInt(startWordStr)
    incrementValue = parseInt(incrementValueStr)
  } catch (e) {}
  return {
    FileName: fileNameStr,
    StartWord: startWord,
    IncrementValue: incrementValue
  }
}

module.exports = (app: express.Application) => {
  app.post('/api/file-upload', (req, res) => {
    multimediaDataController.bookUpload(req, res)
  })

  app.get('/api/word-retrieval/:info', (req, res) => {
    const convertedParams = parseWordRetrievalParameters(
      req.params.info.split(',')
    )
    res.send(
      multimediaDataController.retrieveWords(
        convertedParams['FileName'],
        convertedParams['StartWord'],
        convertedParams['IncrementValue']
      )
    )
  })

  app.get('/api/word-retrieval/:info', (req, res) => {
    const convertedParams = parseWordRetrievalParameters(
      req.params.info.split(',')
    )
    res.send(
      multimediaDataController.retrieveWords(
        convertedParams['FileName'],
        convertedParams['StartWord'],
        convertedParams['IncrementValue']
      )
    )
  })
}
