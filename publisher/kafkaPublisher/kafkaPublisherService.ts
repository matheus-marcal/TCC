import {Kafka} from 'kafkajs'

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9092'],
  })

const service = {
    save :async (body:JSON) =>{
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

export default service