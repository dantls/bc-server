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
const BatteryService = require('../models/BatteryService');

const models = [
  User,
  Brand,
  Type,
  Modelo,
  Device,
  Battery,
  Status,
  Service,
  BatteryService
]

class Database {
  constructor(){
    this.init();
  }

  init(){
    this.connection = new Sequelize(dbConfig);

    models.map(model => model.init(this.connection));
    
    // models.map(model => model.associate(this.connection.models));

    Brand.associate(this.connection.models);
    Modelo.associate(this.connection.models);
    Type.associate(this.connection.models);
    Status.associate(this.connection.models);
    Device.associate(this.connection.models);
    Battery.associate(this.connection.models);
    Service.associate(this.connection.models);
    BatteryService.associate(this.connection.models);
  }
}

export default new Database();