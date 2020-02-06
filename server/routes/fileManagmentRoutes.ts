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
                const wordsRead1 = req.query.wordsRead
                const userID = req.user['googleID']
                
                // Finding the user 
                Users.findOne( { googleID: userID }, function (error, currentUser ) {
                    if (error) console.log(error)

                    if (currentUser) {
                        const currentlyReading = currentUser['currentlyReading']

                        console.log(typeof(currentlyReading))
                        console.log(Object.keys(currentlyReading).length)

                        // we have an empty object
                        if (JSON.stringify(currentlyReading) === '[]') {
                            new bookProgress({
                                title: bookName,
                                wordsRead: wordsRead1
                            }).save().then(savedProgress => {
                                currentUser['currentlyReading'].push(savedProgress)
                                currentUser.save().then(savedUser => {
                                    console.log(savedUser)
                                    res.send(savedUser)
                                })
                            })
                        }
                    }
                })
           }
           else {
               // TODO: we send back some error page saying that the user is not logged in yet
           }
        }
    )
}