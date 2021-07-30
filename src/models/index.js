const Sequelize = require("sequelize");
const dbConfig = require("../database");

require('dotenv/config');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: dbConfig.host,
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 1000
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

const Battery = require('../models/Battery');

db.battery = new Battery(sequelize,Sequelize);


module.exports = db;