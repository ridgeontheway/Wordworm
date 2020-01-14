import fs from 'fs'
import path from 'path'

class localDataManagementService {
    private readonly LOCAL_STORAGE_PATH = "./models/data/"

    constructor() {
        this.initializeDataFolder()
    }

    getLocalStoragePath() { return this.LOCAL_STORAGE_PATH }
    
    isFileDownloaded(fileName: string) {
        const strippedFileName = path.parse(fileName).name
        let isObjectDownloaded = false

        fs.readdir(this.LOCAL_STORAGE_PATH, function (err, files) {
            if (err) { console.log(' error: ', err) }

            for (let i = 0; i < files.length; i++) {
                console.log(files[i].trim().localeCompare(fileName))
                if (files[i].trim().localeCompare(fileName) == 0) {
                    return true
                }
            }
        })

        return false
    }

    private initializeDataFolder() {
        if(!fs.existsSync(this.LOCAL_STORAGE_PATH)) {
            fs.mkdirSync(this.LOCAL_STORAGE_PATH)
        }
    }
}

export const localDataService = new localDataManagementService()