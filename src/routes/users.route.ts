import { Router, Request, Response, NextFunction } from "express";
import { StatusCodes } from 'http-status-codes';
import { Sequelize } from 'sequelize';

const usersRoute = Router();
const users = require('../models/userTable')

usersRoute.get('/users', (req: Request, res: Response, next: NextFunction)=>{
    const users = [{ userName: 'Mateus'}]
    res.send(users)
    res.status(StatusCodes.OK).send(users)
})

usersRoute.get('/users/:uuid', (req: Request<{ uuid: string }>, res: Response, next: NextFunction)=>{
    const uuid = req.params.uuid;
    res.status(StatusCodes.OK).send({ uuid });
})

usersRoute.post('/users', async (req: Request, res: Response, next: NextFunction)=>{
    console.log(req.body);
    await users.create(req.body)
    .then(() =>{
        return res.json({
            erro: false,
            mensagem: "Usuario cadastrado com sucesso!"
        })
    }).catch(() =>{
        return res.status(StatusCodes.NOT_FOUND).json({
            erro: true,
            mensagem: "Usuario não cadastrado com sucesso!"
        })
    })
    res.status(StatusCodes.CREATED).send(req.body)
    
})

usersRoute.put('/users/:uuid', (req: Request<{ uuid: string }>, res: Response, next: NextFunction)=>{
    const uuid = req.params.uuid;
    const modifiedUser = req.body;
    modifiedUser.uuid = uuid
    res.status(StatusCodes.OK).send(modifiedUser)
})


usersRoute.delete('/users/:uuid', (req: Request<{ uuid: string }>, res: Response, next: NextFunction)=>{
    const uuid = req.params.uuid;
    res.sendStatus(StatusCodes.OK)
})


export default usersRoute;