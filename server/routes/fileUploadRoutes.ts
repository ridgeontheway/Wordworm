import multer from 'multer'
import aws from 'aws-sdk'
import express from 'express'
import { fileUploadService } from '../services/fileUpload'
import { sessionKeys } from '../config/keys'

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
}