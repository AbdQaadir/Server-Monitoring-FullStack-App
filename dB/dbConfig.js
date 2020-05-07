require('dotenv').config();
var Sequelize = require('sequelize');

const isProduction = process.env.NODE_ENV === "production";

const connection = new Sequelize(`postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`, {
    define: {
        timestamps: false
    }
})

module.exports = connection