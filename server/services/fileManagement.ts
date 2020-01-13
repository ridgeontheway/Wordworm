import aws from 'aws-sdk'
import multer from 'multer'
import multerS3 from 'multer-s3'
import fs from 'fs'
import { sessionKeys } from '../config/keys'
import { resolve } from 'dns'

class fileManagement {
    public s3: aws.S3;
    public multerObj: multer.Instance;

    constructor(){
        this.awsConfigure()
        this.s3 = new aws.S3()
        this.multerObj = this.multerConfigure()
    }

    awsConfigure() {
        aws.config.update({
            secretAccessKey: sessionKeys.AWSSecretKey,
            accessKeyId: sessionKeys.AWSAccessKeyId,
            region: 'eu-west-1'
        })
    }

    multerConfigure() {
        let tempObj = multer({
            storage: multerS3({
                s3: this.s3,
                bucket: sessionKeys.AWSBucketName,
                metadata: function (req, file, cb) {
                    cb(null, {fieldName: 'TESTING_META_DATA!'})
                },
                key: function (req, file, cb) {
                    console.log(file)
                    cb(null, file.originalname)
                }
            })
        })
        return tempObj
    }

    getUpload() {
        return this.multerObj
    }

    getS3() {
        return this.s3
    }

    getObjectFromS3(key: string) {
        return new Promise((resolve, reject) => {
            const params = {
                Bucket: sessionKeys.AWSBucketName,
                Key: key
            }
            const destPath = "./" + key

            this.s3.getObject(params)
                .createReadStream()
                .pipe(fs.createWriteStream(destPath))
                .on('close', () => {
                    resolve(destPath)
                })
        })
    }
}

export const fileUploadService = new fileManagement()