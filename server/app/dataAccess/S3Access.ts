import aws from 'aws-sdk'
import multer from 'multer'
import multerS3 from 'multer-s3'
import fs from 'fs'
import path from 'path'
import { sessionKeys } from '../../config/sessionKeys/keys'

export default class S3Access {
  public s3: aws.S3
  public objectRequestHandler

  constructor() {
    this.s3 = this.configureBucket()
    this.objectRequestHandler = this.configureMulter()
  }

  configureBucket() {
    const bucket = new aws.S3({
      accessKeyId: sessionKeys.AWSAccessKeyId,
      secretAccessKey: sessionKeys.AWSSecretKey
    })
    return bucket
  }

  configureMulter() {
    const upload = multer({
      storage: multerS3({
        s3: this.s3,
        bucket: sessionKeys.AWSBucketName,
        acl: 'public-read',
        key: (req, file, cb) => {
          cb(null, file.originalname)
        }
      }),
      limits: { fileSize: 2000000 }, // In bytes: 2000000 bytes = 2 MB
      fileFilter: function(req, file, cb) {
        if (file.mimetype === 'application/epub+zip') {
          cb(null, true)
        } else {
          cb(new Error('Invalid file type being uploaded!'), false)
        }
      }
    }).single('book')
    return upload
  }

  uploadObject(req, res, callback: (error: any) => void) {
    this.objectRequestHandler(req, res, callback)
  }
}
