import express from 'express'
import { Router, Request, Response } from 'express';
import kafkaPublisher from "./kafkaPublisher/kafkaPublisherControler"

const app = express();

const route = Router()

app.use(express.json())

app.use("/publisher", kafkaPublisher);

route.get('/', (req: Request, res: Response) => {
  res.json("I am alive")
})

app.use(route)


app.listen(3333, () => 'server running on port 3333')