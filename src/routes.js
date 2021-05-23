const express = require('express');

const UserController = require('./controllers/UserController');

const BrandController = require('./controllers/BrandController');

const TypeController = require('./controllers/TypeController');

const ModeloController = require('./controllers/ModeloController');

const DeviceController = require('./controllers/DeviceController');

const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/sessions', SessionController.store);

routes.post('/users', UserController.store);
routes.get('/users', UserController.index);


routes.post('/brands', BrandController.store);
routes.get('/brands', BrandController.index);

routes.post('/types', TypeController.store);
routes.get('/types', TypeController.index);

//routes.post('/brands/:brand_id/models', ModeloController.store);
routes.post('/models', ModeloController.store);
routes.get('/:brand_id/models', ModeloController.index);

routes.post('/devices', DeviceController.store);
routes.get('/devices', DeviceController.index);

module.exports = routes;