import express, { Request, Response, NextFunction } from 'express'

const app = express()

app.get('/status', (req:Request, res:Response, next:NextFunction) => {
    res.status(200).send({foo: 'linux melhor sistema'})
})


app.listen(3001,()=>{
    console.log("Server rodando na porta 3001");
    
})