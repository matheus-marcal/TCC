const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092'],
})

const kafkaPublisher ={
  save : async(body)=>{
    console.log(body)
    const producer = kafka.producer()
    await producer.connect()
    const data = await producer.send({
      topic: 'test-topic',
      messages: [
        { value: {body} },
      ],
    })
    await producer.disconnect()
    return data
  }
}
module.exports = kafkaPublisher