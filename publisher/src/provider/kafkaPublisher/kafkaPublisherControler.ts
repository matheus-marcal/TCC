import { Router, Request, Response } from 'express';
import kafkaPublisherService from './kafkaPublisherService'

const route = Router()

route.get('/', (req: Request, res: Response) => {
    res.json("You are in Kafka Get")
  })

route.post("/", async (req: Request, res: Response)=>{
    const data = await kafkaPublisherService.save(req.body)
    res.status(200)
    res.send(data)
})

export default route