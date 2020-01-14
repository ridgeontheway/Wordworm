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
        '/api/file-download/:name',
        (req, res) => {
            var fileName = req.params.name

            if (!fileName && req){
                return res.json({'message': 'no file name was given'})
            }

            s3ObjectManagementService.getObjectFromS3(fileName).then(status => res.json({'thing': 'help me'}))
        }
    )
}