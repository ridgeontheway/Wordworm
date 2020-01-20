import aws from 'aws-sdk'
import multer from 'multer'
import multerS3 from 'multer-s3'
import fs from 'fs'
import { sessionKeys } from '../config/keys'
import { localDataService } from './localDataManagementService'

class s3ManagementService {
    public s3: aws.S3;
    public multerObj: multer.Instance;

    constructor(){
        this.awsConfigure()
        this.s3 = new aws.S3()
        this.multerObj = this.multerConfigure()
    }

    getUpload() {
        return this.multerObj
    }

    getObjectFromS3(key: string) {
        return new Promise((resolve, reject) => {
            const params = {
                Bucket: sessionKeys.AWSBucketName,
                Key: key
            }
            const destPath = localDataService.getLocalStoragePath() + key

            this.s3.getObject(params)
                .createReadStream()
                .pipe(fs.createWriteStream(destPath))
                .on('close', () => {
                    resolve(destPath)
                })
        })
    }

    private awsConfigure() {
        aws.config.update({
            secretAccessKey: sessionKeys.AWSSecretKey,
            accessKeyId: sessionKeys.AWSAccessKeyId,
            region: 'eu-west-1'
        })
    }

    private multerConfigure() {
        let tempObj = multer({
            fileFilter: function(req, file, cb) {
                if (file.mimetype === 'application/epub+zip') {
                    cb(null, true)
                }
                else {
                    cb(new Error('Invalid file type being uploaded!'), false)
                }
            },
            storage: multerS3({
                s3: this.s3,
                bucket: sessionKeys.AWSBucketName,
                metadata: function (req, file, cb) {
                    cb(null, {fieldName: 'TESTING_META_DATA!'})
                },
                key: function (req, file, cb) {
                    console.log(file)
                    cb(null, file.originalname)
                },
                acl: 'public-read'
            })
        })
        return tempObj
    }
}

export const s3ObjectManagementService = new s3ManagementService()