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
routes.get('/collaborator/:id', collaboratorController.show);
routes.post('/collaborator', collaboratorController.create);
routes.get('/services', serviceControler.getAll);
routes.post('/service', serviceControler.create);
routes.get('/products', productController.getAll);
routes.post('/product', productController.create);
routes.post('/schedule', scheduleController.create);


// routes.get('/points', pointsControler.index);
// routes.post('/points', pointsControler.create);
// routes.get('/point/:id', pointsControler.show);




export default routes;