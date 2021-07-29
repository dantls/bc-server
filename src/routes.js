import { Router } from 'express';

import UserController from './controllers/UserController';

import BrandController from './controllers/BrandController';

import TypeController from './controllers/TypeController';

import StatusController from './controllers/StatusController';

import ModeloController from './controllers/ModeloController';

import ModeloBrandController from './controllers/ModeloBrandController';

import DeviceController from './controllers/DeviceController';

import BatteryServicesController from './controllers/BatteryServicesController';

import BatteryController from './controllers/BatteryController';

import ServicesController from './controllers/ServicesController';

import SessionController from './controllers/SessionController';

import authMiddleware from './middlewares/auth';

const routes = new Router();

routes.post('/sessions', SessionController.store);

// routes.use(authMiddleware);
// routes.post('/users', authMiddleware, UserController.store);

routes.post('/users', UserController.store);
routes.put('/users', UserController.update);
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
routes.get('/batteries-services', BatteryServicesController.index);

routes.post('/services', ServicesController.store); 
routes.get('/services', ServicesController.index);

export default routes;