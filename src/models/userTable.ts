import {  } from 'mysql2';
const Sequelize = require('sequelize');

const database = require('./connect')

 
const users = database.define('users', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
})
 

users.sync({ alter: true });

module.exports = users;
