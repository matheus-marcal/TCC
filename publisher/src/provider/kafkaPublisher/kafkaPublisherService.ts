import {Kafka, RecordMetadata} from 'kafkajs'

const kafka = new Kafka({
    clientId: process.env.KAFKA_CLIENTID,
    brokers: [String(process.env.KAFKA_BROKERS)],
  })
export default class kafkaPublisherService{
  static async save (body:JSON) :Promise<RecordMetadata[]>{
    const producer = kafka.producer()
    await producer.connect()
    const data = await producer.send({
      topic: 'test-topic',
      messages: [
        { value: JSON.stringify(body) },
      ],
    })
    await producer.disconnect()
    return data
    }
  }