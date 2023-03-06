import {Kafka} from 'kafkajs'
import dotenv from  'dotenv'
import S3Service from  './providers/AWSS3/s3Service'
import ComputePiService from  './providers/util/computePi'
import AzureBlobService from  './providers/AzureBlob/azureBlobService'
import GoogleStorageService from  './providers/GoogleStorage/googleStorageService'

dotenv.config()
const kafka = new Kafka({
  clientId: process.env.KAFKA_CLIENTID,
  brokers: [String(process.env.KAFKA_BROKERS)],
  })
  
  const kafkaTopic = process.env.KAFKA_TOPIC ?process.env.KAFKA_TOPIC:"test-topic"

  const functionConsumer =async ()=>{
    const consumer = kafka.consumer({ groupId: 'test-group' })
    
    await consumer.connect()
    await consumer.subscribe({ topic: kafkaTopic, fromBeginning: true })
    AzureBlobService
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log(JSON.parse(String(message.value)))
        const objContent =JSON.parse(String(message.value))
        const computePi = ComputePiService.compute(objContent.piInterations)
        const content = {pi:computePi,conteudo:objContent.content}
        const fileName = objContent.fileName
        if(process.env.CLOUD==='AWS')
          S3Service.uploadFile(JSON.stringify(content,null,4),fileName)
        else if(process.env.CLOUD==='GCP')
          GoogleStorageService.uploadFile(JSON.stringify(content,null,4),fileName)
        else if(process.env.CLOUD==='Azure')
          AzureBlobService.uploadFile(JSON.stringify(content,null,4),fileName)
        else {
          console.log(JSON.stringify(content,null,4))
          console.log({fileName})
        }
      },
    })
    
    }
    
    functionConsumer()