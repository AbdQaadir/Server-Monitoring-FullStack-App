require('dotenv').config();
var Sequelize = require('sequelize');

let dbConnection = null;

process.env.NODE_ENV === "test" ? dbConnection = process.env.dbConnection : dbConnection = 'postgres://uiwbbdrf:LPeb13nXxjgwp5i3xtMiiGL-IrFPEznO@drona.db.elephantsql.com:5432/uiwbbdrf';

const connection = new Sequelize(dbConnection, {
    host: "localhost",
    dialect: "postgres",
    define: {
        timestamps: false
    }
})


module.exports = connection;