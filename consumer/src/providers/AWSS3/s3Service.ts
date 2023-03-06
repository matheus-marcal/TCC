import AWS from 'aws-sdk'
import dotenv from  'dotenv'
dotenv.config()

const s3bucket = new AWS.S3({
  accessKeyId: process.env.IAM_USER_KEY,
  secretAccessKey: process.env.IAM_USER_SECRET,
})

const bucketName:string = process.env.BUCKET_NAME ?process.env.BUCKET_NAME:"tcc-marcal"

export default class s3Service{
    static async uploadFile(contentfile:string, fileName:string){
        const params = {
            Bucket:bucketName,
            Key: fileName,
            Body: contentfile,
          }
        
          s3bucket.upload(params, function (s3Err, data) {
            if (s3Err) console.log(s3Err)
            console.log(`File uploaded successfully at ${data.Location}`)
          })
    }
}

