const express = require('express');

const UserController = require('./controllers/UserController');

const BrandController = require('./controllers/BrandController');

const TypeController = require('./controllers/TypeController');

const StatusController = require('./controllers/StatusController');

const ModeloController = require('./controllers/ModeloController');

const ModeloBrandController = require('./controllers/ModeloBrandController');

const DeviceController = require('./controllers/DeviceController');

const BatteryServicesController = require('./controllers/BatteryServicesController');

const BatteryController = require('./controllers/BatteryController');

const ServicesController = require('./controllers/ServicesController');

const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/sessions', SessionController.store);

routes.post('/users', UserController.store);
routes.get('/users', UserController.index);


routes.post('/brands', BrandController.store);
routes.get('/brands/:id', BrandController.show);
routes.put('/brands/:id', BrandController.update);
routes.delete('/brands/:id', BrandController.delete);
routes.get('/brands', BrandController.index);

routes.post('/types', TypeController.store);
routes.get('/types', TypeController.index);
routes.put('/types/:id', TypeController.update);
routes.delete('/types/:id', TypeController.delete);
routes.get('/types/:id', TypeController.show);

routes.post('/status', StatusController.store);
routes.get('/status', StatusController.index);
routes.put('/status/:id', StatusController.update);
routes.delete('/status/:id', StatusController.delete);
routes.get('/status/:id', StatusController.show);


routes.post('/models', ModeloController.store);
routes.get('/models', ModeloController.index);
routes.put('/models/:id', ModeloController.update);
routes.delete('/models/:id', ModeloController.delete);
routes.get('/models/:id', ModeloController.show);

routes.get('/brands/:brand_id/models', ModeloBrandController.index);

routes.post('/devices', DeviceController.store);
routes.get('/devices', DeviceController.index);
routes.put('/devices/:id', DeviceController.update);
routes.delete('/devices/:id', DeviceController.delete);

routes.post('/batteries', BatteryController.store);
routes.get('/batteries', BatteryController.index);
routes.put('/batteries/:id', BatteryController.update);
routes.delete('/batteries/:id', BatteryController.delete);

routes.post('/batteries-services/:battery_id', BatteryServicesController.store);


routes.post('/services', ServicesController.store);
routes.get('/services', ServicesController.index);

module.exports = routes;