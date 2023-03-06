import {Kafka, RecordMetadata} from 'kafkajs'
import dotenv from 'dotenv'
dotenv.config()

const kafkabroker = process.env.KAFKA_BROKERS?process.env.KAFKA_BROKERS:'alocalhost:9092'
console.log(kafkabroker)
const kafka = new Kafka({
    clientId: process.env.KAFKA_CLIENTID,
    brokers: [kafkabroker],
  })

const kafkaTopic:string = process.env.KAFKA_TOPIC ?process.env.KAFKA_TOPIC:"test-topic"

export default class kafkaPublisherService{

  static async save (body:JSON) :Promise<RecordMetadata[]>{
    const producer = kafka.producer()
    await producer.connect()
    const data = await producer.send({
      topic:kafkaTopic,
      messages: [
        { value: JSON.stringify(body) },
      ],
    })
    await producer.disconnect()
    return data
    }
  }