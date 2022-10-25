import jwt from 'jsonwebtoken'
import { decode } from 'punycode'
import { LoginBody } from '../../type'

export default class loginService {
    static async login(body:LoginBody){
        if(body.key===process.env.JWT_SECRET && body.username===process.env.JWT_USERNAME)
            return {token:await jwt.sign(body,`${process.env.JWT_SECRET}`,{ expiresIn: '1h' })}
        else 
            throw {message:'Usuario não encontrado', status:404}
    }
    static validateToken(token:string):Boolean{
        jwt.verify(token,`${process.env.JWT_SECRET}`,(err,decoded)=>{
            if(!decoded)
                throw {message:'Token expirado ou invalido', status:403}
        })
        return true

    }
}