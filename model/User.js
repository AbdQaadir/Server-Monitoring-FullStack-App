const connection = require('../dB/config');

var Sequelize = require('sequelize');
const User = connection.define('user', {
    email: Sequelize.STRING,
    password: Sequelize.STRING,
})

module.exports =  User;