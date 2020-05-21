import express from 'express'
import { controller as bookDataController } from '../../controllers/BookDataController'

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
