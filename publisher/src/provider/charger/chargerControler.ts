import { Router, Request, Response } from 'express';
import chargerService from './chargerService'

const route = Router()

route.post("/", async (req: Request, res: Response)=>{
    const data = await chargerService.init(req.body.folder)
    res.status(200)
    res.send(data)
})

export default route