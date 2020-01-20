import express from 'express'
import { s3ObjectManagementService } from '../services/s3ManagementService'
import { localDataService } from '../services/localDataManagementService'

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
}