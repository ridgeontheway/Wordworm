import express from 'express'
import { controller as bookDataController } from '../../controllers/BookProgressDataController'
import { controller as userDataController } from '../../controllers/UserDataController'

module.exports = (app: express.Application) => {
  app.get('/api/retrieve-book-progress', (req, res) => {
    if (req.user && req.query.id) {
      const _id = req.query.id
      bookDataController.findById(_id, (error, result) => {
        if (error) console.error(error)
        if (result) res.send(result)
      })
    }
  })

  app.get('/api/update-book-progress', (req, res) => {
    if (req.user && req.query.bookName && req.query.wordsRead) {
      const bookName = req.query.bookName
      const userID = req.user['googleID']
      const updatedWordsRead = req.query.wordsRead
      bookDataController.update(
        bookName,
        userID,
        updatedWordsRead,
        (error, result) => {
          if (error) console.error(error)
          if (result) res.send(result)
        }
      )
    }
  })

  app.get('/api/delete-book-progress', (req, res) => {
    if (req.query.userProgressObjectID) {
      // TODO: add some auth here
      const objectID: string = req.query.userProgressObjectID
      res.send(bookDataController.delete(objectID))
    }
  })

  app.post('/api/create-book-progress', (req, res) => {
    if (req.user && req.query.bookName) {
      const bookName: string = req.query.bookName
      const userID: string = req.user['googleID']
      bookDataController.create(
        bookName,
        0,
        userID,
        (error, newBookProgress) => {
          if (error) console.error(error)
          if (newBookProgress) {
            // Adding the book progress to the user
            const bookProgressSchemaID = newBookProgress._id
            userDataController.update(
              userID,
              bookProgressSchemaID,
              updatedUser => {
                if (error) console.error(error)
                console.log('User updated with new bookProgress: ', updatedUser)
                res.send(newBookProgress)
              }
            )
          }
        }
      )
    }
  })

  app.get('/api/retrieve-book-progress', (req, res) => {
    if (req.user && req.query.bookName) {
      const bookName: string = req.query.bookName
      const userID: string = req.user['googleID']
      bookDataController.retrieve(bookName, userID, (error, result) => {
        if (error) console.error(error)
        if (result) res.send(result)
      })
    }
  })

  app.get('/api/update-book-progress', (req, res) => {
    if (req.user && req.query.bookName && req.query.wordsRead) {
      const bookName = req.query.bookName
      const userID = req.user['googleID']
      const updatedWordsRead = req.query.wordsRead
      bookDataController.update(
        bookName,
        userID,
        updatedWordsRead,
        (error, result) => {
          if (error) console.error(error)
          if (result) res.send(result)
        }
      )
    }
  })

  app.get('/api/delete-book-progress', (req, res) => {
    if (req.query.userProgressObjectID) {
      // TODO: add some auth here
      const objectID: string = req.query.userProgressObjectID
      res.send(bookDataController.delete(objectID))
    }
  })
}
