import {Storage} from '@google-cloud/storage'

const bucketName = process.env.GOOGLE_BUCKET_NAME?process.env.GOOGLE_BUCKET_NAME:'bucket-quickstart_dynamic-parity-379500'   

export default class googleStorageService{
    static async uploadFile(contentfile:string, fileName:string){
        const storage = new Storage();
        await storage.bucket(bucketName).file(fileName).save(contentfile).catch(()=>{
            googleStorageService.uploadFile(contentfile,fileName)
        })
    }
}

