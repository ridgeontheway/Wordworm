import express from 'express'
import { controller as bookDataController } from '../../controllers/BookDataController'

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
    bookDataController.create(req, res)
  })

  app.get('/api/word-retrieval', (req, res) => {
    const bookName: string = req.query.bookName
    const startWord: number = req.query.startWord
    const incrementValue: number = req.query.incrementValue
    bookDataController.retrieve(res, bookName, startWord, incrementValue)
  })
}
