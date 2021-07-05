const Sequelize = require('sequelize');
const dbConfig = require('../config/database');
const User = require('../models/User');
const Brand = require('../models/Brand');
const Type = require('../models/Type');
const Modelo = require('../models/Modelo');
const Battery = require('../models/Battery');
const Device = require('../models/Device');
const Status = require('../models/Status');
const Service = require('../models/Service');

const connection = new Sequelize(dbConfig);

User.init(connection);
Brand.init(connection);
Type.init(connection);
Modelo.init(connection);
Device.init(connection);
Battery.init(connection);
Status.init(connection);
Service.init(connection);


Brand.associate(connection.models);
Modelo.associate(connection.models);
Type.associate(connection.models);
Status.associate(connection.models);
Device.associate(connection.models);
Battery.associate(connection.models);
Service.associate(connection.models);


module.exports = connection;