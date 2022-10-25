import { Router, Request, Response } from 'express';
import { HTTPError } from '../../type';
import loginService from './loginService';

const route = Router()

route.post("/", async (req: Request, res: Response)=>{
    try{
        const data = await loginService.login(req.body)
        res.status(200)
        res.send(data)
    }catch(err:any){
        res.status(err.status)
        res.send(err.message)
    }
})

export default route