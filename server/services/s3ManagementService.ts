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

    isObjectUploaded(key: string) {
        let objectUploaded = false
        const keys: string[] = this.getObjectsFromBucket(sessionKeys.AWSBucketName)

        for (let i = 0; i < keys.length; i++) {
            if (keys[i] === key) {
                objectUploaded = true
                break
            }
        }

        return objectUploaded
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

    private getObjectsFromBucket(bucketName: string) {
        let keyArray: string[] = new Array()
        const response = this.s3.listObjectsV2({
            Bucket: sessionKeys.AWSBucketName,
        })

        if (response) {
            //response.Contents.forEach(item => {
            //    keyArray.push(item.Key!.toString())
            //}) 
        }

        return keyArray
    }
}

export const s3ObjectManagementService = new s3ManagementService()