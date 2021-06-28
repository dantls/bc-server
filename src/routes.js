const express = require('express');

const UserController = require('./controllers/UserController');

const BrandController = require('./controllers/BrandController');

const TypeController = require('./controllers/TypeController');

const StatusController = require('./controllers/StatusController');

const ModeloController = require('./controllers/ModeloController');

const DeviceController = require('./controllers/DeviceController');

const BatteryController = require('./controllers/BatteryController');

const ServicesController = require('./controllers/ServicesController');

const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/sessions', SessionController.store);

routes.post('/users', UserController.store);
routes.get('/users', UserController.index);


routes.post('/brands', BrandController.store);
routes.get('/brands/:id', BrandController.index);
routes.put('/brands', BrandController.update);
routes.delete('/brands/:id', BrandController.delete);
routes.get('/brands', BrandController.show);

routes.post('/types', TypeController.store);
routes.get('/types', TypeController.index);

routes.post('/status', StatusController.store);
routes.get('/status', StatusController.index);

//routes.post('/brands/:brand_id/models', ModeloController.store);
routes.post('/models', ModeloController.store);
routes.get('/:brand_id/models', ModeloController.index);

routes.post('/devices', DeviceController.store);
routes.get('/devices', DeviceController.index);

routes.post('/batteries', BatteryController.store);
routes.get('/batteries', BatteryController.index);


routes.post('/services', ServicesController.store);
routes.get('/services', ServicesController.index);

module.exports = routes;