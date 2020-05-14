require('dotenv').config();
var Sequelize = require('sequelize');

let dbConnection = null;

if (process.env.NODE_ENV === "test") dbConnection = process.env.dbConnection;
else{
    dbConnection = ""
}
const connection = new Sequelize(dbConnection, {
    define: {
        timestamps: false
    }
})


module.exports = connection;