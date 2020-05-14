const connection = require('../dB/dbConfig')
var Sequelize = require('sequelize');


const User = connection.define('users', {
    email: Sequelize.STRING,
    password: Sequelize.STRING,
})
// User.beforeCreate((user, options) => {
//     let salt = bcrypt.genSaltSync(10);
//     let hash = bcrypt.hashSync(user.password, salt);
//     return (user.password = hash);
//   });

module.exports =  User;