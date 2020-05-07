const connection = require('../dB/dbConfig')
var Sequelize = require('sequelize');


const User = connection.define('users', {
    name: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
})


module.exports =  User