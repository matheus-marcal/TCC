import express from 'express'
import { Router, Request, Response ,NextFunction} from 'express'
import kafkaPublisherRoute from "./provider/kafkaPublisher/kafkaPublisherControler"
import loginRoute from"./provider/login/loginController"
import dotenv from 'dotenv'
import loginService from "./provider/login/loginService"
import { HTTPError } from './type'

dotenv.config()

const app = express();

const route = Router()

app.use(express.json())

app.use((req:Request,res:Response,next:NextFunction)=>{
  try{
    if(req.path ==="/login")
    next()
    else if(req.headers.authorization){
      if(!loginService.validateToken(req.headers.authorization)){
        throw {message:'Token invalido', status:403}
      }}
    else
      throw {message:'Header Authorization não presente', status:403}

    next()
  }catch(err:any){
    res.status(err.status)
    res.send(err.message) 
  }
})

app.use("/publisher", kafkaPublisherRoute);
app.use("/login", loginRoute);

route.get('/', (req: Request, res: Response) => {
  res.json("I am alive")
})

app.use(route)


app.listen(3333, () => 'server running on port 3333')