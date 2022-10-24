import {Consumer, Kafka} from 'kafkajs'

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:9092'],
  })

  const functionConsumer =async ()=>{
    const consumer:Consumer = kafka.consumer({ groupId: 'test-group' })
    
    await consumer.connect()
    await consumer.subscribe({ topic: 'test-topic', fromBeginning: true })
    
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log({
          value:JSON.parse(String(message.value)),
        })
      },
    })
    
    }
    
    functionConsumer()