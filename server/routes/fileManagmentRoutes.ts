import express from 'express'
import { s3ObjectManagementService } from '../services/s3ManagementService'
import { localDataService } from '../services/localDataManagementService'
import mongoose  from 'mongoose'
import { bookProgress }  from '../models/book-progress'

const Users = mongoose.model('Users');
const upload = s3ObjectManagementService.getUpload();
const singleUpload = upload.single('image') 

module.exports = (app: express.Application) => {
    app.post(
        '/api/file-upload',
        (req, res) => {
            singleUpload(req, res, function(err) {
                return res.json({'imageUrl': req.file.location})
            })
        }
    )
    
    app.get(
        '/api/word-retrieval/:info',
        (req, res) => {
            var info = req.params.info.split(',')
            var fileName = info[0]
            var startWordStr = info[1]
            var incrementValueStr = info[2]
            //var chapterNumber = req.params.name

            try {
                var startWord = parseInt(startWordStr)
                var incrementValue = parseInt(incrementValueStr)
            }
            catch (e) { }
            if (req && (!fileName )){
                return res.json({'message': 'no file name was given'})
            }

            s3ObjectManagementService.getObjectFromS3(fileName).then(status => {
                localDataService.getRequestedWords(fileName, startWord, incrementValue).then(requestedWords => {
                    res.send({'Requested Chapter': requestedWords})
                })
            })
        }
    )

    app.get(
        '/api/set-words-read',
        (req, res) => {
            if (req.user && req.query.bookName && req.query.wordsRead) {
                const bookName = req.query.bookName
                const updatedWordsRead = req.query.wordsRead
                const userID = req.user['googleID']
               
                 // Finding the user 
                 bookProgress.findOne( { title: bookName,  userIDReading: userID  }, function (error, oldProgress ) {
                    if (error) console.log(error)
                    if (oldProgress) {
                        console.log('we did find a book progression')
                        oldProgress['wordsRead'] = updatedWordsRead
                        oldProgress.save().then(updatedBookProgress => {
                            res.send(updatedBookProgress)
                        })
                    }
                    else {
                        console.log('we DID NOT find a book here')
                       Users.findOne( { googleID: userID }, function (error, currentUser ) {
                           if (error) console.log(error)
                           if (currentUser) {
                               // we have an empty object
                               new bookProgress({
                                   title: bookName,
                                   wordsRead: updatedWordsRead,
                                   userIDReading: userID
                               }).save().then(savedProgress => {
                                   currentUser['currentlyReading'].push(savedProgress)
                                   currentUser.save().then(savedUser => {
                                       res.send(savedUser)
                                   })
                                })
                           }
                       })
                    }
                 })
            }
        }
    )
}