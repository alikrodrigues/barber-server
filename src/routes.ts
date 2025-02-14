import expres from 'express';
import ServiceController from './controller/ServicesController';
import ProductController from './controller/ProductController';
import CollaboratorController from './controller/CollaboratorController';
import SaleController from './controller/SaleController';
import ScheduleController from './controller/ScheduleController';

const routes = expres.Router();


const serviceControler = new ServiceController();
const productController = new ProductController();
const collaboratorController = new CollaboratorController();
const saleController = new SaleController();
const scheduleController = new ScheduleController();

routes.get('/collaborators', collaboratorController.getAll);
routes.get('/collaborators/free/:day', collaboratorController.getAll);
routes.get('/collaborator/:id', collaboratorController.show);
routes.post('/collaborator', collaboratorController.create);
routes.get('/services', serviceControler.getAll);
routes.post('/service', serviceControler.create);
routes.get('/products&services', productController.getAllAndServices);
routes.get('/products', productController.getAll);
routes.post('/product', productController.create);
routes.get('/schedules', scheduleController.getScheduled);
routes.get('/scheduleIndex/:id', scheduleController.getScheduleItem);
routes.post('/schedule', scheduleController.create);
routes.post('/fastsale/:id', saleController.fastSale);
routes.post('/sale', saleController.sale);



export default routes;