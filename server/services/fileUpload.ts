import aws from 'aws-sdk'
import multer from 'multer'
import multerS3 from 'multer-s3'
import { sessionKeys } from '../config/keys'

class fileUpload {
    public s3: aws.S3;
    public multerObj: multer.Instance;

    constructor(){
        this.awsConfigure()
        this.s3 = new aws.S3()
        this.multerObj = multer({
            storage: multerS3({
                s3: this.s3,
                bucket: 'wordworm-dev-1',
                metadata: function (req, file, cb) {
                    cb(null, {fieldName: 'TESTING_META_DATA!'})
                },
                key: function (req, file, cb) {
                    console.log(file)
                    cb(null, Date.now().toString())
                }
            })
        })
    }

    awsConfigure() {
        aws.config.update({
            secretAccessKey: sessionKeys.AWSSecretKey,
            accessKeyId: sessionKeys.AWSAccessKeyId,
            region: 'eu-west-1'
        })
    }

    getUpload() {
        return this.multerObj
    }
}

export const fileUploadService = new fileUpload()