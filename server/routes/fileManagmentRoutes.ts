import express from 'express'
import { fileUploadService } from '../services/fileManagement'
import { sessionKeys } from '../config/keys'
import fs from 'fs'

const upload = fileUploadService.getUpload();
const singleUpload = upload.single('image')

module.exports = (app: express.Application) => {
    app.post(
        '/api/file-upload',
        (req, res) => {
            singleUpload(req, res, function(err) {
                console.log(req)
                return res.json({'imageUrl': req.file.location})
            })
        }
    )

    app.get(
        '/api/file-download/:name',
        (req, res) => {
            var fileName = req.params.name
            if (!fileName && req){
                return res.json({'message': 'no file name was given'})
            }
            fileUploadService.getObjectFromS3(fileName).then(abns => res.json({'thing': 'help me'}))
        }
    )
}