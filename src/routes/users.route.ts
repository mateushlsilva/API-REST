import { Router, Request, Response, NextFunction } from "express";
import { StatusCodes } from 'http-status-codes';
import { QueryTypes } from 'sequelize';
//const {  QueryTypes  } = require("sequelize");

const usersRoute = Router();
const users = require('../models/userTable')

usersRoute.get('/users', async(req: Request, res: Response, next: NextFunction)=>{
    const usersList = await users.findAll();
    res.status(StatusCodes.OK).send(usersList)
})

usersRoute.get('/users/:uuid', async(req: Request<{ uuid: string }>, res: Response, next: NextFunction)=>{
    const uuid = req.params.uuid;
    const project = await users.findOne({ where: { id: uuid } });
    if (project === null) {
        console.log('Not found!');
    } else {
    console.log(project instanceof users); // true
    console.log(project.id); // 'My Title'
}
    
})

usersRoute.post('/users', async (req: Request, res: Response, next: NextFunction)=>{
    const newUser = req.body
    await users.create(newUser)
    .then(() =>{
        return res.json({
            erro: false,
            mensagem: "Usuario cadastrado com sucesso!"
        })
    }).catch(() =>{
        return res.status(StatusCodes.NOT_FOUND).json({
            erro: true,
            mensagem: "Usuario não cadastrado!"
        })
    })
})

usersRoute.put('/users/:uuid', async(req: Request<{ uuid: string }>, res: Response, next: NextFunction)=>{
    const uuid = req.params.uuid;
    const modifiedUser = req.body;
    modifiedUser.uuid = uuid
    await users.update(modifiedUser, {
        where: {
            id: uuid
          }
    })
    .then(() =>{
        return res.json({
            erro: false,
            mensagem: "Usuario atualizado com sucesso!"
        })
    }).catch(() =>{
        return res.status(StatusCodes.NOT_FOUND).json({
            erro: true,
            mensagem: "Usuario não atualizado!"
        })
    })
})


usersRoute.delete('/users/:uuid', async(req: Request<{ uuid: string }>, res: Response, next: NextFunction)=>{
    const uuid = req.params.uuid;
    await users.destroy({
        where: {
            id: uuid
          }
    })
    .then(() =>{
        return res.json({
            erro: false,
            mensagem: "Usuario deletado com sucesso!"
        })
    }).catch(() =>{
        return res.status(StatusCodes.NOT_FOUND).json({
            erro: true,
            mensagem: "Usuario não deletado!"
        })
    })
})


export default usersRoute;