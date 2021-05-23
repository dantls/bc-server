const Sequelize = require('sequelize');
const dbConfig = require('../config/database');
const User = require('../models/User');
const Brand = require('../models/Brand');
const Type = require('../models/Type');
const Modelo = require('../models/Modelo');
const Device = require('../models/Device');

const connection = new Sequelize(dbConfig);

User.init(connection);
Brand.init(connection);
Type.init(connection);
Modelo.init(connection);
Device.init(connection);

Modelo.associate(connection.models);
Brand.associate(connection.models);
Type.associate(connection.models);
Device.associate(connection.models);


module.exports = connection;